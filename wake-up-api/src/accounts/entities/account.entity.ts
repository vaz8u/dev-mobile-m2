import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type AccountDocument = HydratedDocument<Account>;

@Schema()
@ObjectType()
export class Account {
    @Field(() => String)
    _id: MongooseSchema.Types.ObjectId | string;

    @Prop({ required: true })
    @Field(() => String)
    username: string;

    @Prop({ required: true })
    password: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
