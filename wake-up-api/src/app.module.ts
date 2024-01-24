import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AccountsModule } from './accounts/accounts.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { AlarmsModule } from './alarms/alarms.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsService } from './accounts/accounts.service';
import { AuthService } from './auth/auth.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            context: ({ req }) => ({ user: req.user })
        }),
        MongooseModule.forRoot(
            process.env.DB_CONNECTION,
            {
                dbName: `wakeup-${process.env.NODE_ENV}`,
            }
        ),
        AccountsModule,
        AlarmsModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService, AccountsService, AuthService]
})
export class AppModule { }
