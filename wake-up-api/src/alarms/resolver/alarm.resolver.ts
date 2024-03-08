import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { CreateAlarmInput } from '../dto/create-alarm.input';
import { Alarm } from '../entities/alarm.entity';
import { AlarmsService } from '../alarms.service';
import { UpdateAlarmInput } from '../dto/update-alarm.input';

@Resolver(() => Alarm)
export class AlarmResolver {
  constructor(private readonly alarmsService: AlarmsService) {}

  @Mutation(() => Alarm)
  async createAlarm(
    @Args('alarmInput') alarmInput: CreateAlarmInput,
    @Context() user: any,
  ): Promise<Alarm> {
    if (!user || !user.req.user.username) {
      throw new Error('User not authenticated');
    }

    const alarm = { ...alarmInput, activated: true };

    // Create the alarm for authenticated user
    return this.alarmsService.create(alarm, user.req.user.username);
  }

  @Query(() => [Alarm], { name: 'alarms' })
  findAll() {
    return this.alarmsService.findAll();
  }

  @Query(() => Alarm, { name: 'alarm' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.alarmsService.findOne(id);
  }

  @Mutation(() => Alarm)
  updateAlarm(@Args('updateAlarmInput') updateAlarmInput: UpdateAlarmInput) {
    return this.alarmsService.update(updateAlarmInput.id, updateAlarmInput);
  }

  @Mutation(() => Boolean)
  async deleteAlarm(@Args('alarmId') alarmId: string): Promise<boolean> {
    return await this.alarmsService.remove(alarmId);
  }

  @Mutation(() => Alarm)
  async activateAlarm(@Args('id') id: string): Promise<Alarm> {
    return this.alarmsService.activate(id);
  }

  @Mutation(() => Alarm)
  async deactivateAlarm(@Args('id') id: string): Promise<Alarm> {
    return this.alarmsService.deactivate(id);
  }
}
