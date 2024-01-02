import { Injectable } from '@nestjs/common';
import { AccountsService } from 'src/accounts/accounts.service';
import { LoginAccountInput } from './dto/login-account.input';
import { LoginResponse } from './dto/login-response';
import { Account } from 'src/accounts/entities/account.entity';
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

export type ExcludePasswordAccount = Omit<Account, "password">;

@Injectable()
export class AuthService {
    constructor(
        private accountsService: AccountsService,
        private jwtService: JwtService) { }

    async validateUser(username: string, password: string): Promise<any> {
        const account = await this.accountsService.findOne(username);
        if (account && (await bcrypt.compare(password, account.password))) {
            delete account.password;
            return account;
        }
        return null;
    }

    async login(loginAccountInput: LoginAccountInput): Promise<LoginResponse> {
        const account = await this.validateUser(loginAccountInput.username, loginAccountInput.password);
        return {
            access_token: this.jwtService.sign({
                username: loginAccountInput.username
            }),
            account: account
        }
    }
}

