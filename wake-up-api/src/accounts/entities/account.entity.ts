import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { Alarm } from 'src/alarms/entities/alarm.entity';

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

    @Field(() => [Alarm], { nullable: true })
    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Alarm' }] })
    alarms?: Types.ObjectId[];
}

export const AccountSchema = SchemaFactory.createForClass(Account);
