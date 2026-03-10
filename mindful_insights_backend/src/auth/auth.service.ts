import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Researcher } from "src/Users/researcher/researcher.entity";
import * as bcrypt from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TokenBlacklistService } from "./config/tokenblacklist";
import { CreateUserDto } from "./input/create.user.dto";

@Injectable()
export class AuthService{
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(Researcher)
        private readonly userRepository: Repository<Researcher>,
        private readonly tokenBlacklistService: TokenBlacklistService,
    ){}

    private getusersBaseQuery(){
      return this.userRepository
          .createQueryBuilder('v')
          .orderBy('v.userID','ASC');
    }

    // public getTokenForUser(user: Researcher): string{
    //     return this.jwtService.sign({
    //         username: user.username,
    //         sub: user.id
    //     });
    // }
    getTokenForUser(user: Researcher): string {
        const payload = { username: user.username, sub: user.id, roles: user.roles.map(role => role.name) };
        return this.jwtService.sign(payload);
      }

    public async hashPassword(password: string): Promise<string>{
        return await bcrypt.hash(password, 10);
    }

    // async findOne(condition): Promise<Researcher> {
    //     const [user] = await this.userRepository.find({ where: condition });
    //     return user;
    // }

    async findOne(condition: any): Promise<Researcher | undefined> {
        return this.userRepository.findOne({
          where: condition,
          relations: ['roles'],
        });
    }

       

    //logout
    async logout(user: Researcher, token: string): Promise<void> {
        this.tokenBlacklistService.addToBlacklist(token);
    
        console.log("Logged out!");
    }
    
      isTokenBlacklisted(token: string): boolean {
        return this.tokenBlacklistService.isTokenBlacklisted(token);
    }
      
}