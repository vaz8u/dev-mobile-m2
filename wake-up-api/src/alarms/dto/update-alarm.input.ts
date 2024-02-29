import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateAlarmInput {
    @Field(() => String)
    id: string;

    @Field(() => String, { nullable: true })
    name?: string;

    @Field(() => String, { nullable: true })
    triggeredDate?: string;

    @Field(() => Boolean, { nullable: true })
    alarmSound?: boolean;

    @Field(() => Boolean, { nullable: true })
    vibratorSound?: boolean;

    @Field(() => Boolean, { nullable: true })
    activated?: boolean;
}
