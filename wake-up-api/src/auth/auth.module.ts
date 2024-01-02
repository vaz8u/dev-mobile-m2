import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountsModule } from 'src/accounts/accounts.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [AccountsModule, PassportModule, JwtModule.registerAsync({
        useFactory: () => ({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: '3600s',
            },
        })
    })],
    providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy]
})
export class AuthModule { }
