import { Transform, Type } from "class-transformer";
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";

export class UpdateTaskDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsEnum(['Todo', 'Doing', 'Done'])
    status?: 'Todo' | 'Doing' | 'Done';

    @IsOptional()
    @IsString()
    @Transform(({ value }) => (value === '' ? null : value))
    assignee?: string | null;
}