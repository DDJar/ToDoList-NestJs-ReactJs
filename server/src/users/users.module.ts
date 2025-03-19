import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schema/User.schema";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { Task, TaskSchema } from "src/schema/Task.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: User.name,
            schema: UserSchema,

        }, {
            name: Task.name,
            schema: TaskSchema,

        }])
    ],
    providers: [UsersService],
    controllers: [UsersController]
})
export class UsersModule { };