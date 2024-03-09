import { Field, ObjectType } from '@nestjs/graphql';
import { Account } from 'src/accounts/entities/account.entity';

// @ObjectType()
// export class ExcludePasswordAccount implements Omit<Account, "password"> {
//     username: string;
// }

@ObjectType()
export class LoginResponse {
  @Field()
  access_token: string;

  @Field(() => Account)
  account: Account;
}
