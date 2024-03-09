import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAlarmInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  triggeredDate: string;

  @Field(() => Boolean)
  alarmSound: boolean;

  @Field(() => Boolean)
  vibratorSound: boolean;

  @Field(() => Boolean, { defaultValue: true })
  activated: boolean;
}
