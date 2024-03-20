import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AccountsModule } from './accounts/accounts.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AlarmsModule } from './alarms/alarms.module';
import { CacheModule } from '@nestjs/cache-manager';
import { GraphQLFormattedError } from 'graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: (error) => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        context: ({ req }) => ({ user: req.user }),
        formatError: (error) => {
          const originalError = error.extensions
            ?.originalError as GraphQLFormattedError;

          if (!originalError) {
            return {
              message: error.message,
              code: error.extensions?.code,
            };
          }
          return {
            message: originalError.message,
            code: error.extensions?.code,
          };
        },
      }),
    }),
    MongooseModule.forRoot(process.env.DB_CONNECTION, {
      dbName: `wakeup-${process.env.NODE_ENV}`,
    }),
    AccountsModule,
    AlarmsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
