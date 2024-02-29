import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AccountsService } from './accounts.service';
import { Account } from './entities/account.entity';
import { CreateAccountInput } from './dto/create-account.input';
import { UpdateAccountInput } from './dto/update-account.input';
import { Public } from 'src/decorators';

@Resolver(() => Account)
export class AccountsResolver {
  constructor(private readonly accountsService: AccountsService) {}

  @Public()
  @Mutation(() => Account)
  createAccount(
    @Args('createAccountInput') createAccountInput: CreateAccountInput,
  ) {
    return this.accountsService.create(createAccountInput);
  }

  @Query(() => [Account], { name: 'accounts' })
  findAll() {
    return this.accountsService.findAll();
  }

  @Query(() => Account, { name: 'account' })
  findOne(@Args('username', { type: () => String }) username: string) {
    return this.accountsService.findOne(username);
  }

  @Mutation(() => Account)
  updateAccount(
    @Args('updateAccountInput') updateAccountInput: UpdateAccountInput,
  ) {
    return this.accountsService.update(updateAccountInput);
  }

  @Mutation(() => Boolean)
  removeAccount(@Args('username', { type: () => String }) username: string) {
    return this.accountsService.remove(username);
  }
}
