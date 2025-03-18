import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/Schema/User.schema";
import { CreateUserDto } from "./dto/CreateUser.dto";
import { UpdateUserDto } from "./dto/UpdateUser.dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }
    async createUser(createUserDto: CreateUserDto) {
        const newUser = new this.userModel(createUserDto);
        return newUser.save();
    }
    async getsUsers(page: number, limit = 5) {
        try {
            const skip = (page - 1) * limit;

            const listUsers = await this.userModel
                .find()
                .skip(skip)
                .limit(limit);

            const totalUsers = await this.userModel.countDocuments();
            const totalPages = Math.ceil(totalUsers / limit);
            return {
                status: 200,
                message: "Users fetched successfully",
                data: {
                    users: listUsers,
                    totalPages: totalPages,
                    currentPage: page,
                },
            };
        } catch (error) {
            console.error("Error fetching users:", error);
            return {
                status: 500,
                message: "Internal Server Error",
                error: error.message,
            };
        }
    }
    getsUserById(id: string) {
        return this.userModel.findById(id);
    }
    updateUser(id: string, updateUserDto: UpdateUserDto) {
        return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    }
    deleteUserById(id: string) {
        return this.userModel.findByIdAndDelete(id)
    }
}