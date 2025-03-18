import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Task } from "src/Schema/Task.schema";
import { CreateTaskDto } from "./dto/CreateTask.dto";
import { User } from "src/Schema/User.schema";


@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private TaskModel: Model<Task>,
        @InjectModel(User.name) private userModel: Model<User>,) { }
    async createTask(createTaskDto: CreateTaskDto) {
        const newTask = new this.TaskModel(createTaskDto);
        const savedTask = await newTask.save();
        return savedTask
    }

}