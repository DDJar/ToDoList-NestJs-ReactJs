import { Type } from "class-transformer";
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";
export class CreateTaskDto {
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsEnum(['todo', 'doing', 'done'])
    status?: 'todo' | 'doing' | 'done';

    @IsOptional()
    @IsString()
    assignee?: string;
}

export class UpdateTaskDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsEnum(['todo', 'doing', 'done'])
    status?: 'todo' | 'doing' | 'done';

    @IsOptional()
    @IsString()
    assignee?: string;
}