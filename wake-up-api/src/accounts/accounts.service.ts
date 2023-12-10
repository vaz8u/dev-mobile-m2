import { Injectable } from '@nestjs/common';
import { CreateAccountInput } from './dto/create-account.input';
import { UpdateAccountInput } from './dto/update-account.input';
import { Account } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AccountsService {
    constructor(@InjectRepository(Account) private accountsRepository: Repository<Account>) { }

    create(createAccountInput: CreateAccountInput): Promise<Account> {
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
