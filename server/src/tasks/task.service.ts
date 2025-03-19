import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Task } from "src/schema/Task.schema";
import { CreateTaskDto } from "./dto/CreateTask.dto";
import { User } from "src/schema/User.schema";
import { UpdateTaskDto } from "./dto/UpdateTask.dto";


@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private taskModel: Model<Task>,
        @InjectModel(User.name) private userModel: Model<User>,) { }
    async createTask(createTaskDto: CreateTaskDto) {
        try {
            if (!createTaskDto.assignee) {
                createTaskDto.assignee = null;
            } else if (!mongoose.Types.ObjectId.isValid(createTaskDto.assignee)) {
                return {
                    status: 400,
                    message: "Invalid assignee",

                };
            }
            const newTask = new this.taskModel(createTaskDto);
            await newTask.save();
            return {
                status: 200,
                message: "Task created successfull",
                data: {
                    task: newTask
                },
            };
        } catch (error) {
            console.error("Error creating task:", error);
            return {
                status: 500,
                message: "Internal Server Error",
                error: error.message,
            };
        }

    }
    async updateTask(id: string, updateDto: UpdateTaskDto) {
        try {
            if (!updateDto.assignee) {
                updateDto.assignee = null;
            } else if (!mongoose.Types.ObjectId.isValid(updateDto.assignee)) {
                return {
                    status: 400,
                    message: "Invalid assignee",

                };
            }
            const updateTask = await this.taskModel.findByIdAndUpdate(id, updateDto, { new: true });
            if (!updateTask) {
                return {
                    status: 404,
                    message: "Task Not Found",

                };
            }
            return {
                status: 200,
                message: "Task update successfull",
                data: {
                    task: updateTask
                },
            };
        } catch (error) {
            console.error("Error updating task:", error);
            return {
                status: 500,
                message: "Internal Server Error",
                error: error.message,
            };
        }

    }
    async findTaskById(id: string) {
        return await this.taskModel.findById(id,);
    }
    async deleteTask(id: string) {
        try {
            const result = await this.taskModel.findByIdAndDelete(id);
            if (!result) {
                return {
                    status: 404,
                    message: "Task not found",
                };
            }
            return {
                status: 200,
                message: "Delete task successfully",
            };
        } catch (error) {
            console.error("Error deleting task:", error);
            return {
                status: 500,
                message: "Internal Server Error",
                error: error.message,
            };
        }

    }

    async findAllTask() {
        try {

            const listTask = await this.taskModel.find().populate('assignee').exec();
            return {
                status: 200,
                message: "Task fetched successfully",
                data: {
                    task: listTask,
                },
            };
        } catch (error) {
            console.error("Error fetching tasks:", error);
            return {
                status: 500,
                message: "Internal Server Error",
                error: error.message,
            };
        }

    }

}