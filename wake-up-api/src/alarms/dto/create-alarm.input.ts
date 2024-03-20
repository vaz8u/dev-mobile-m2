import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAlarmInput {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  transportMethod: string;

  @Field(() => String, { nullable: true })
  departure: string;

  @Field(() => String, { nullable: true })
  arrival: string;

  @Field(() => String, { nullable: true })
  wakeUpTime: string;

  @Field(() => String, { nullable: true })
  arriveTime: string;

  @Field(() => Boolean, { defaultValue: false })
  repetition: boolean;

  @Field(() => [Boolean], { defaultValue: [] })
  days: boolean[];

  @Field(() => String, { nullable: true })
  arrivalTime: string;

  @Field(() => String, { nullable: true })
  departureTime: string;

  @Field(() => String)
  triggeredDate: string;

  @Field(() => Boolean)
  alarmSound: boolean;

  @Field(() => Boolean)
  vibratorSound: boolean;

  @Field(() => Boolean, { defaultValue: true })
  activated: boolean;
}
