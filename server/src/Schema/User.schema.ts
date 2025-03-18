import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
    @Prop({ unique: true, required: true })
    username: string;

    @Prop({ unique: true, required: true })
    email: string;

    @Prop({ required: true })
    full_name?: string;

    @Prop({ required: true })
    gender: boolean;

    @Prop({ required: true })
    dob: Number;

}
export const UserSchema = SchemaFactory.createForClass(User);