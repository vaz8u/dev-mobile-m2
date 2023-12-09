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

    async findOne(id: number): Promise<Account> {
        return this.accountsRepository.findOneOrFail({
            where: {
                id: id
            }
        });
    }

    async update(id: number, updateAccountInput: UpdateAccountInput): Promise<Account | null> {
        const updateResult = await this.accountsRepository.update(id, updateAccountInput);
        if (updateResult.raw === 0) {
            return null;
        }
        return this.findOne(id);
    }

    async remove(id: number): Promise<boolean> {
        return (await this.accountsRepository.delete(id)).raw !== 0;
    }
}
