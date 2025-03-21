import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, Query, Search, UsePipes, ValidationPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/CreateUser.dto";
import mongoose from "mongoose";
import { UpdateUserDto } from "./dto/UpdateUser.dto";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }
    @Post()
    @UsePipes(new ValidationPipe())
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Get()
    getUsers(@Query('tab') currentPage: number) {
        const page = Number(currentPage) || 1;
        return this.usersService.getsUsers(page);
    }
    @Get('/view-all')
    getAllUsers() {
        return this.usersService.getsAllUsers();
    }
    @Get('/search')
    async searchUser(@Query('tab') currentPage: number, @Query('search') search: string) {
        const page = Number(currentPage) || 1;
        return this.usersService.searchUsers(search, page);
    }
    @Get(':id')
    async getUserById(@Param('id') id: string) {
        const findUser = await this.usersService.getsUserById(id);
        if (!findUser) throw new HttpException("User Not Found", 404);
        return findUser;
    }
    @Patch(':id')
    @UsePipes(new ValidationPipe())
    async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto,) {
        const isValidId = mongoose.Types.ObjectId.isValid(id);
        if (!isValidId) {
            return {
                status: 400,
                message: "Invalid ID",

            };
        }
        const updateUser = await this.usersService.updateUser(id, updateUserDto);
        if (!updateUser) throw new HttpException("User Not Found", 404);
        return updateUser;
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        const isValidId = mongoose.Types.ObjectId.isValid(id);
        if (!isValidId) throw new HttpException("Invalid ID", 400);
        const deleteUser = await this.usersService.deleteUserById(id);
        if (!deleteUser) throw new HttpException("User Not Found", 404);
        return deleteUser
    }
}