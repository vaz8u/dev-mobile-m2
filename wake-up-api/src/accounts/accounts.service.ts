import { Injectable } from '@nestjs/common';
import { CreateAccountInput } from './dto/create-account.input';
import { UpdateAccountInput } from './dto/update-account.input';
import { Account } from './entities/account.entity';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class AccountsService {
  constructor(@InjectModel(Account.name) private accountModel: Model<Account>) {
    this.create({
      username: 'admin',
      password: 'admin',
    });
  }

  async create(createAccountInput: CreateAccountInput): Promise<Account> {
    if ((await this.findOne(createAccountInput.username)) !== null) {
      return null;
    }

    createAccountInput.password = await bcrypt.hash(
      createAccountInput.password,
      10,
    );

    const newAccount = new this.accountModel(createAccountInput);
    const res = await newAccount.save();
    return res;
  }

  async findAll(): Promise<Account[]> {
    return await this.accountModel.find().exec();
  }

  async findOne(username: string): Promise<Account> {
    return await this.accountModel
      .findOne({
        username: username,
      })
      .exec();
  }

  async update(updateAccountInput: UpdateAccountInput): Promise<Account> {
    if (!updateAccountInput.username && !updateAccountInput.password) {
      return null;
    }

    const account = await this.findOne(updateAccountInput.target);

    if (!account) return null;

    const updateResult = await this.accountModel
      .updateOne(
        {
          username: updateAccountInput.target,
        },
        {
          username: updateAccountInput.username ?? account.username,
          password: updateAccountInput.password ?? account.password,
        },
      )
      .exec();

    if (updateResult.modifiedCount === 0) {
      return null;
    }

    return await this.findOne(updateAccountInput.username ?? account.username);
  }

  async remove(username: string): Promise<boolean> {
    const deleteResult = await this.accountModel
      .deleteOne({
        username: username,
      })
      .exec();

    return deleteResult.deletedCount === 1;
  }

  async addAlarmToAccount(username: string, alarmId: Types.ObjectId) {
    const account = await this.accountModel
      .findOne({ username: username })
      .exec();

    if (account) {
      account.alarms.push(alarmId);
      await account.save();
    }
  }

  async findUsersByAlarm(alarmId: string): Promise<Account[]> {
    try {
      // Find users where the given alarmId is present in their alarms array
      const users = await this.accountModel.find({ alarms: alarmId }).exec();
      return users;
    } catch (error) {
      console.error('Error finding users by alarm:', error);
      throw error;
    }
  }

  async removeAlarmFromAccount(
    username: string,
    alarmId: string,
  ): Promise<Account> {
    try {
      const user = await this.accountModel
        .findOne({ username: username })
        .exec();

      if (!user || !user.alarms) {
        throw new Error('User or alarms array not found.');
      }

      user.alarms = user.alarms.filter((alarm) => !alarm.equals(alarmId));

      await user.save();

      return user;
    } catch (error) {
      console.error('Error removing alarm from account:', error);
      throw error;
    }
  }
}
