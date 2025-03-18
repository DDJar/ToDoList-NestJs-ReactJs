import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateTaskDto } from "./dto/CreateTask.dto";
import { TasksService } from "./task.service";
import mongoose from "mongoose";
import { UpdateTaskDto } from "./dto/UpdateTask.dto";


@Controller('tasks')
export class TaskController {
    constructor(private tasksService: TasksService) { }
    @Post()
    @UsePipes(new ValidationPipe())
    createPost(@Body() createTask: CreateTaskDto) {
        return this.tasksService.createTask(createTask);
    }
    @Get()
    getTask() {
        return this.tasksService.findAllTask();
    }

    @Get(':id')
    async getTaskById(@Param('id') id: string) {
        const isValidId = mongoose.Types.ObjectId.isValid(id);
        if (!isValidId) throw new HttpException("Invalid ID", 400);
        const findTask = await this.tasksService.findTaskById(id);
        if (!findTask) throw new HttpException("Task Not Found", 404);
        return findTask;
    }
    @Patch(':id')
    @UsePipes(new ValidationPipe())
    async updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto,) {
        const isValidId = mongoose.Types.ObjectId.isValid(id);
        if (!isValidId) throw new HttpException("Invalid ID", 400);
        const updateTask = await this.tasksService.updateTask(id, updateTaskDto);
        if (!updateTask) throw new HttpException("Task Not Found", 404);
        return updateTask;
    }

    @Delete(':id')
    async deleteTask(@Param('id') id: string) {
        const isValidId = mongoose.Types.ObjectId.isValid(id);
        if (!isValidId) throw new HttpException("Invalid ID", 400);
        const deleteTask = await this.tasksService.deleteTask(id);
        if (!deleteTask) throw new HttpException("Task Not Found", 404);
        return deleteTask
    }
}