import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { TaskModule } from './tasks/task.module';
@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/todoList')
    , UsersModule
    , TaskModule],
  controllers: [],
  providers: []
})
export class AppModule { }
