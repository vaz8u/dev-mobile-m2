import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginAccountInput } from './dto/login-account.input';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { LogoutInterception } from 'src/interceptors/logout.interceptor';
import { Public } from 'src/decorators';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Public()
  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(@Args('loginAccountInput') loginAccountInput: LoginAccountInput) {
    return this.authService.login(loginAccountInput);
  }

  @UseInterceptors(LogoutInterception)
  @Query(() => Boolean)
  logout() {
    return true;
  }
}
