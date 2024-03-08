import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type AlarmDocument = HydratedDocument<Alarm>;

@Schema()
@ObjectType()
export class Alarm {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId | string;

  @Prop({ required: true })
  @Field(() => String)
  name: string;

  @Prop({ required: true })
  @Field(() => String)
  triggeredDate: string;

  @Prop({ required: true })
  @Field(() => Boolean)
  alarmSound: boolean;

  @Prop({ required: true })
  @Field(() => Boolean)
  vibratorSound: boolean;

  @Prop({ default: true })
  @Field(() => Boolean)
  activated: boolean;
}

export const AlarmSchema = SchemaFactory.createForClass(Alarm);
