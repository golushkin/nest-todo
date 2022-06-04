
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  userName: string;

  @Prop()
  email: string;

  @Prop({ required: true })
  pass: string;
}

export const UsersSchema = SchemaFactory.createForClass(User);
