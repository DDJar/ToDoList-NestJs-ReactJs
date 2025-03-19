import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/Schema/User.schema";
import { CreateUserDto } from "./dto/CreateUser.dto";
import { UpdateUserDto } from "./dto/UpdateUser.dto";
import { Task } from "src/Schema/Task.schema";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Task.name) private taskModel: Model<Task>) { }
    async createUser(createUserDto: CreateUserDto) {
        try {
            const { email, username } = createUserDto;
            const existingUser = await this.userModel.findOne({
                $or: [{ email }, { username }],
            });
            if (existingUser) {
                return {
                    status: 400,
                    message: existingUser.email === email
                        ? "Email already exists in the system"
                        : "Username already exists in the system",
                };
            }

            const newUser = new this.userModel(createUserDto);
            newUser.save();
            return {
                status: 200,
                message: "User created successfull",
            };
        } catch (error) {
            console.error("Error creating users:", error);
            return {
                status: 500,
                message: "Internal Server Error",
                error: error.message,
            };
        }


    }
    async getsUsers(page: number, limit = 5) {
        try {
            const skip = (page - 1) * limit;

            const listUsers = await this.userModel
                .find()
                .skip(skip)
                .limit(limit)
                .lean();
            const userIds = listUsers.map(user => user._id);
            const userTasks = await this.taskModel.find({ assignee: { $in: userIds } });
            const usersWithTasks = listUsers.map(user => ({
                ...user,
                tasks: userTasks.filter(task => task.assignee.toString() === user._id.toString())
            }));
            const totalUsers = await this.userModel.countDocuments();
            const totalPages = Math.ceil(totalUsers / limit);
            return {
                status: 200,
                message: "Users fetched successfully",
                data: {
                    users: usersWithTasks,
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
    async getsAllUsers() {
        try {

            const listUsers = await this.userModel
                .find()
                .lean();
            return {
                status: 200,
                message: "Users fetched successfully",
                data: {
                    users: listUsers,
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
    async searchUsers(search: string, page: number, limit = 5) {
        try {
            const skip = (page - 1) * limit;
            let searchCondition = {};
            if (search) {
                searchCondition = search
                    ? {
                        $or: [
                            { full_name: new RegExp(search, 'i') },
                            { email: new RegExp(search, 'i') },
                        ],
                    }
                    : {};
            }
            const listUsers = await this.userModel
                .find(searchCondition)
                .skip(skip)
                .limit(limit);

            const totalUsers = await this.userModel.countDocuments(searchCondition);
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
    async updateUser(id: string, updateUserDto: UpdateUserDto) {
        try {
            if (updateUserDto.email) {
                const existingUser = await this.userModel.findOne({
                    email: updateUserDto.email,
                    _id: { $ne: id },
                });

                if (existingUser) {
                    return {
                        status: 400,
                        message: "Email already exists in the system",
                    };
                }
            }

            const result = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
            return {
                status: 200,
                message: "Users update successfully",
                data: {
                    users: result
                },
            };
        } catch (error) {
            console.error("Error updating users:", error);
            return {
                status: 500,
                message: "Internal Server Error",
                error: error.message,
            };
        }

    }
    async deleteUserById(id: string) {
        try {
            const user = await this.userModel.findById(id);
            if (!user) {
                return {
                    status: 404,
                    message: "User not found",
                };
            }
            const taskCount = await this.taskModel.countDocuments({ assignee: id });
            if (taskCount > 0) {
                return {
                    status: 400,
                    message: "User still has tasks",
                };
            }
            const result = await this.userModel.findByIdAndDelete(id);
            if (!result) {
                return {
                    status: 404,
                    message: "User not found",
                };
            }
            return {
                status: 200,
                message: "Delete users successfully",
            };
        } catch (error) {
            console.error("Error deleting user:", error);
            return {
                status: 500,
                message: "Internal Server Error",
                error: error.message,
            };
        }

    }
}