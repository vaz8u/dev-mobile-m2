import { Inject, Injectable } from '@nestjs/common';
import { AccountsService } from 'src/accounts/accounts.service';
import { LoginAccountInput } from './dto/login-account.input';
import { LoginResponse } from './dto/login-response';
import { Account } from 'src/accounts/entities/account.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

export type ExcludePasswordAccount = Omit<Account, 'password'>;

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private accountsService: AccountsService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Account | null> {
    const account = await this.accountsService.findOne(username);
    if (account && (await bcrypt.compare(password, account.password))) {
      delete account.password;
      return account;
    }
    return null;
  }

  async login(loginAccountInput: LoginAccountInput): Promise<LoginResponse> {
    const account = await this.validateUser(
      loginAccountInput.username,
      loginAccountInput.password,
    );
    return {
      access_token: this.jwtService.sign({
        username: loginAccountInput.username,
      }),
      account: account,
    };
  }

  async logout(jwt: string): Promise<void> {
    const payload = this.jwtService.decode(jwt);
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const timeToLive = payload.exp - currentTimestamp;

    await this.cacheManager.set(jwt, true, timeToLive * 1000);
  }

  public async shouldBlock(jwt: string): Promise<boolean> {
    return ((await this.cacheManager.get(jwt)) as boolean) !== true;
  }
}
