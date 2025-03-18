import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateTaskDto } from "./dto/CreateTask.dto";
import { TasksService } from "./task.service";


@Controller('tasks')
export class TaskController {
    constructor(private tasksService: TasksService) { }
    @Post()
    @UsePipes(new ValidationPipe())
    createPost(@Body() createTask: CreateTaskDto) {
        return this.tasksService.createTask(createTask);
    }
}