import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length, IsOptional, IsArray } from "class-validator";

export class CreateUserDto{
    @Length(2)
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    userID: string;

    @Length(5)
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    username: string;

    @Length(2)
    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    firstName: string;

    @Length(2)
    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    lastName: string;

    @Length(8)
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string;

    @Length(8)
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    retypedPassword: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsArray()
    @IsNotEmpty()
    @ApiProperty()
    roles: string[]; 
}