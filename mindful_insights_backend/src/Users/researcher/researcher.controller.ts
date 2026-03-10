import { BadRequestException, Body, Controller, Injectable, Post, Put, Param, UseGuards, Get } from "@nestjs/common";
import { AuthService } from "../../auth/auth.service";
import { CreateUserDto } from "../../auth/input/create.user.dto";
import { Researcher } from "./researcher.entity";
import { EntityNotFoundError, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { emitWarning } from "process";
import { validate } from 'class-validator';
import { Role } from "src/roles/role.entity";
import { UserResponseDto } from "src/auth/input/userResponse.dto";
import { AuthGuardJwt } from "src/auth/config/auth.guard.jwt";
import { ResearcherService } from './researcher.service';
import { AnalystResponseDto } from "src/auth/input/role-analyst.dto";

@Controller()
export class ResearcherController{
    constructor(
        private readonly authService: AuthService,
        private readonly researcherService: ResearcherService,
        @InjectRepository(Researcher)
        private readonly userRepository: Repository<Researcher>,
        @InjectRepository(Researcher)
        private readonly roleRepository: Repository<Role>
    ){}

    @Post('register')
    async create(@Body() createResearcherDto: CreateUserDto): Promise<UserResponseDto> {
        return await this.userRepository.manager.transaction(async transactionalEntityManager => {
            const user = new Researcher();

            const errors = await validate(createResearcherDto);
            if (errors.length > 0) {
                throw new BadRequestException(errors);
            }

            if (createResearcherDto.password !== createResearcherDto.retypedPassword) {
                throw new BadRequestException(['Passwords are not similar']);
            }

            const existingUser = await transactionalEntityManager.findOne(Researcher, {
                where: [
                    { username: createResearcherDto.username },
                    { email: createResearcherDto.email },
                ],
            });

            if (existingUser) {
                throw new BadRequestException(['username or email already exists']);
            }

            user.userID = createResearcherDto.userID;
            user.username = createResearcherDto.username;
            user.password = await this.authService.hashPassword(createResearcherDto.password);
            user.email = createResearcherDto.email;

            console.log('Populated User Entity:', user);

            const savedUser = await transactionalEntityManager.save(Researcher, user);

            console.log('Saved User:', savedUser);

            const roles = createResearcherDto.roles.map(roleName => {
                const role = new Role();
                role.name = roleName;
                role.researcher = savedUser;
                return role;
            });

            await transactionalEntityManager.save(Role, roles);

            savedUser.roles = roles;

            const response: UserResponseDto = {
                id: savedUser.id,
                userID: savedUser.userID,
                username: savedUser.username,
                email: savedUser.email,
                token: this.authService.getTokenForUser(savedUser),
                roles: roles.map(role => role.name),
            };

            return response;
        });
    }

    //get all analyst
    @Get('analysts')
    @UseGuards(AuthGuardJwt)
    async findAllAnalysts(): Promise<AnalystResponseDto[]> {
       return await this.researcherService.getAnalystAsResponseDto();
    }




    // @Put('update/:userID')
    // async update(@Param('userID') userID: string, @Body() updateResearcherDto: Partial<CreateUserDto>){
    //     const user = await this.userRepository.findOne({ where: { userID } });

    //     if (!user) {
    //         throw new BadRequestException(['User not found']);
    //     }

    //     const updatedFields = {
    //         ...user,
    //         ...updateResearcherDto
    //     };

    //     return await this.userRepository.save(updatedFields);
    // }

}



// @Post('register')
//     async create(@Body() createResearcherDto: CreateUserDto){
//         const user = new Researcher();

//         const errors = await validate(createResearcherDto);
//         if (errors.length > 0) {
//             throw new BadRequestException(errors);
//         }
        
//         if(createResearcherDto.password !== createResearcherDto.retypedPassword){
//             throw new BadRequestException(['Passwords are not similar']);
//         }

//         const existingUser = await this.userRepository.findOne({
//             where: {
//                 username: createResearcherDto.username,
//                 email: createResearcherDto.email
//             },
//         });

//         if(existingUser){
//             throw new BadRequestException(['username or email already exists']);
//         }

//         user.userID = createResearcherDto.userID;
//         user.username = createResearcherDto.username;
//         user.password =  await this.authService.hashPassword(createResearcherDto.password);
//         user.email = createResearcherDto.email;

//         return{
//             ... (await this.userRepository.save(user)),
//             token: this.authService.getTokenForUser(user)
//         }
//     }