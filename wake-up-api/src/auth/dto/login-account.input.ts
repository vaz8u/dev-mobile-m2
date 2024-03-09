import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginAccountInput {
  @Field()
  username: string;

  @Field()
  password: string;
}
