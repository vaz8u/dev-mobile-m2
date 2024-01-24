import { Module } from '@nestjs/common';
import { AlarmsService } from './alarms.service';

import { Alarm, AlarmSchema } from './entities/alarm.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { AlarmResolver } from './resolver/alarm.resolver';
import { AccountsModule } from 'src/accounts/accounts.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: Alarm.name, schema: AlarmSchema }]),
AccountsModule],
    providers: [AlarmResolver, AlarmsService],
    exports: [AlarmsService],
})
export class AlarmsModule {}
