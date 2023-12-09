import { CreateAccountInput } from './create-account.input';
import { InputType, Field, PartialType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateAccountInput extends PartialType(CreateAccountInput) {
    @Field(() => Int, { description: 'Id of an account (generated)' })
    id: number;
}
