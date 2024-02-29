import { CreateAccountInput } from './create-account.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAccountInput extends PartialType(CreateAccountInput) {
  @Field(() => String, { description: 'the username of the account to target' })
  target: string;
}
