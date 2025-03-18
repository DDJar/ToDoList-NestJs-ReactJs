import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Task, TaskSchema } from "src/Schema/Task.schema";
import { TasksService } from "./task.service";
import { TaskController } from "./task.controller";
import { User, UserSchema } from "src/Schema/User.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Task.name,
            schema: TaskSchema,

        },
        {
            name: User.name,
            schema: UserSchema,
        },])
    ],
    providers: [TasksService],
    controllers: [TaskController]
})
export class TaskModule { };