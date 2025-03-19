import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "./User.schema";
@Schema()
export class Task {
    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop({ enum: ['Todo', 'Doing', 'Done'], default: 'Todo' })
    status: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false, default: null })
    assignee: User;
}
export const TaskSchema = SchemaFactory.createForClass(Task);