import { Endereco } from './endereco';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  // @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  _id: any;
  
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  senha: string;

  @Prop({ required: true })
  endereco: Endereco;
  
}

export const UserSchema = SchemaFactory.createForClass(User);
