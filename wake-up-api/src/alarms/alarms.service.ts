import { Injectable } from '@nestjs/common';
import { CreateAlarmInput } from './dto/create-alarm.input';
import { Alarm, AlarmDocument } from './entities/alarm.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountsService } from 'src/accounts/accounts.service';
import { UpdateAlarmInput } from './dto/update-alarm.input';

@Injectable()
export class AlarmsService {
  constructor(
    @InjectModel(Alarm.name) private alarmModel: Model<Alarm>,
    private readonly accountsService: AccountsService,
  ) {}

  async create(
    createAlarmInput: CreateAlarmInput,
    userId: string,
  ): Promise<Alarm> {
    const newAlarm = new this.alarmModel({ ...createAlarmInput });
    const savedAlarm = await newAlarm.save();

    const user = await this.accountsService.findOne(userId);

    this.accountsService.addAlarmToAccount(user.username, savedAlarm.id);
    return savedAlarm;
  }

  async findAll(): Promise<Alarm[]> {
    return await this.alarmModel.find().exec();
  }

  async findOne(alarmId: string): Promise<Alarm> {
    return await this.alarmModel.findById(alarmId).exec();
  }

  async update(
    alarmId: string,
    updateAlarmInput: UpdateAlarmInput,
  ): Promise<Alarm> {
    const existingAlarm = await this.findOne(alarmId);

    if (!existingAlarm) {
      return null;
    }

    existingAlarm.name = updateAlarmInput.name ?? existingAlarm.name;
    existingAlarm.triggeredDate =
      updateAlarmInput.triggeredDate ?? existingAlarm.triggeredDate;
    existingAlarm.alarmSound =
      updateAlarmInput.alarmSound ?? existingAlarm.alarmSound;
    existingAlarm.vibratorSound =
      updateAlarmInput.vibratorSound ?? existingAlarm.vibratorSound;

    const updatedAlarm = await (existingAlarm as AlarmDocument).save();
    return updatedAlarm;
  }

  async remove(alarmId: string): Promise<boolean> {
    const deleteResult = await this.alarmModel
      .findByIdAndDelete(alarmId)
      .exec();

    if (!deleteResult) {
      return false;
    }

    const users = await this.accountsService.findUsersByAlarm(alarmId);

    for (const user of users) {
      this.accountsService.removeAlarmFromAccount(user.username, alarmId);
    }

    return true;
  }
}
