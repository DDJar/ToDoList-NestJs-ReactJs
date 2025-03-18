import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsEmail()
    email: string;
    full_name: string;
    gender: boolean;
    dob: Number

}