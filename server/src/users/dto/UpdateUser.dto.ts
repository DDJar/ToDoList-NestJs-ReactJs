import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @IsOptional()
    full_name: string;

    @IsOptional()
    gender: boolean;

    @IsOptional()
    dob: Number
}