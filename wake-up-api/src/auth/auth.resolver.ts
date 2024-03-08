import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginAccountInput } from './dto/login-account.input';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LogoutInterception } from 'src/interceptors/logout.interceptor';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(@Args('loginAccountInput') loginAccountInput: LoginAccountInput) {
    return this.authService.login(loginAccountInput);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(LogoutInterception)
  @Query((returns) => Boolean)
  logout() {
    return true;
  }
}
