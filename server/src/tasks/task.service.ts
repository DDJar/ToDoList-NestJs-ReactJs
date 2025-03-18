import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Task } from "src/Schema/Task.schema";
import { CreateTaskDto } from "./dto/CreateTask.dto";
import { User } from "src/Schema/User.schema";
import { UpdateTaskDto } from "./dto/UpdateTask.dto";


@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private taskModel: Model<Task>,
        @InjectModel(User.name) private userModel: Model<User>,) { }
    async createTask(createTaskDto: CreateTaskDto) {
        const newTask = new this.taskModel(createTaskDto);
        const savedTask = await newTask.save();
        return savedTask
    }
    async updateTask(id: string, updateDto: UpdateTaskDto) {
        return await this.taskModel.findByIdAndUpdate(id, updateDto, { new: true });
    }
    async findTaskById(id: string) {
        return await this.taskModel.findById(id,);
    }
    async deleteTask(id: string) {
        return await this.taskModel.findByIdAndDelete(id);
    }

    async findAllTask() {
        return this.taskModel.find().populate('assignee').exec();
    }

}