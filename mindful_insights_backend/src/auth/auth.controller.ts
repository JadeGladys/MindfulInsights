import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, Post, Req, Request, SerializeOptions, UnauthorizedException, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { CurrentUser } from "../Users/researcher/current-user.decorator";
import { Researcher } from "src/Users/researcher/researcher.entity";
import { AuthGuardLocal } from "./config/auth.guard.local";
import { AuthGuardJwt } from "./config/auth.guard.jwt";
import { NotFoundError } from "rxjs";
import * as bcrypt from 'bcrypt';

@Controller('auth')
@SerializeOptions({strategy:'excludeAll'})
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }
  @Post('log')
  @UseGuards(AuthGuardLocal)
  async login(@CurrentUser() user: Researcher) {
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
  
    return {
      userId: user.userID,
      token: this.authService.getTokenForUser(user),
      username: user.username
    };
  }
  
  @Post('login')
  async logs(
    @Body('username') username: string,
    @Body('password') password: string
  ) {
    const user = await this.authService.findOne({ username });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (!await bcrypt.compare(password, user.password)) {
      throw new BadRequestException('Invalid credentials');
    }

    const roles = user.roles.map(role => role.name);

    return {
      userId: user.userID,
      token: this.authService.getTokenForUser(user),
      username: user.username,
      id: user.id,
      roles,
    };
  }


  @Get('profile')
  @UseGuards(AuthGuardJwt)
  async getProfile(@CurrentUser() user: Researcher): Promise<Researcher> {
    return user;
  }

  @Post('logout')
  @UseGuards(AuthGuardJwt)
  async logout(@CurrentUser() user: Researcher, @Req() request: Request) {
    const token = (request.headers['authorization'] as string).split(' ')[1]; // Extract the token from the Authorization header

    await this.authService.logout(user, token);

    return { message: 'Logout successful' };
  }


}



// @Post('login')
//   async logs(
//     @Body('username') username: string,
//     @Body('password') password: string
//   ){
//     const user = await this.authService.findOne({ username: username });

//     if(!user) {
//       throw new NotFoundError('User not found');
//     }

//     if(!await bcrypt.compare(password, user.password)){
//       throw new BadRequestException('Invalid credentials');
//     }

//     return {
//       userId: user.userID,
//       token: this.authService.getTokenForUser(user),
//       username: user.username,
//       id: user.id,
//     };
//   }