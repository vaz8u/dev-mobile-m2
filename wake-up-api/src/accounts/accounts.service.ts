import { Injectable } from '@nestjs/common';
import { CreateAccountInput } from './dto/create-account.input';
import { UpdateAccountInput } from './dto/update-account.input';
import { Account } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AccountsService {
    constructor(@InjectRepository(Account) private accountsRepository: Repository<Account>) {

        this.create({
            username: 'admin',
            password: 'admin'
        })
    }

    async create(createAccountInput: CreateAccountInput): Promise<Account> {
        createAccountInput.password = await bcrypt.hash(createAccountInput.password, 10);

        const newAccount = this.accountsRepository.create(createAccountInput);

        return this.accountsRepository.save(newAccount);
    }

    async findAll(): Promise<Account[]> {
        return await this.accountsRepository.find();
    }

    async findOne(username: string): Promise<Account> {
        return this.accountsRepository.findOne({
            where: {
                username: username
            }
        });
    }

    async update(username: string, updateAccountInput: UpdateAccountInput): Promise<Account> {
        const updateResult = await this.accountsRepository.update(username, updateAccountInput);
        if (updateResult.affected === 0) {
            return null;
        }
        return this.findOne(username);
    }

    async remove(username: string): Promise<boolean> {
        return (await this.accountsRepository.delete(username)).affected !== 0;
    }
}
