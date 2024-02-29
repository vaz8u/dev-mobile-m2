import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { CreateAlarmInput } from '../dto/create-alarm.input';
import { UpdateAlarmInput } from '../dto/update-alarm.input';
import { Alarm } from '../entities/alarm.entity';
import { AlarmsService } from '../alarms.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AccountsService } from 'src/accounts/accounts.service';

@Resolver(() => Alarm)
export class AlarmResolver {
    constructor(private readonly alarmsService: AlarmsService,
        private readonly accountsService: AccountsService) { }

    @Mutation(() => Alarm)
    @UseGuards(JwtAuthGuard)
    async createAlarm(@Args('alarmInput') alarmInput: CreateAlarmInput, @Context() user: any): Promise<Alarm> {
        if (!user || !user.req.user.username) {
            throw new Error('User not authenticated');
        }
      
        const alarm = { ...alarmInput, activated: true };
          
        // Create the alarm for authenticated user
        return this.alarmsService.create(alarm, user.req.user.username);
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => [Alarm], { name: 'alarms' })
    findAll() {
        return this.alarmsService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => Alarm, { name: 'alarm' })
    findOne(@Args('id', { type: () => String }) id: string) {
        return this.alarmsService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Alarm)
    updateAlarm(@Args('updateAlarmInput') updateAlarmInput: UpdateAlarmInput) {
        return this.alarmsService.update(updateAlarmInput.id, updateAlarmInput);
    }

    @Mutation(() => Boolean)
    @UseGuards(JwtAuthGuard)
    async deleteAlarm(@Args('alarmId') alarmId: string): Promise<boolean> {
        return await this.alarmsService.remove(alarmId);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Alarm)
    async activateAlarm(@Args('id') id: string): Promise<Alarm> {
        return this.alarmsService.activate(id);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Alarm)
    async deactivateAlarm(@Args('id') id: string): Promise<Alarm> {
        return this.alarmsService.deactivate(id);
    }
}
