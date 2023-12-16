import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAccountInput {
    @Field(() => String)
    username: string;

    @Field(() => String)
    password: string;
}
