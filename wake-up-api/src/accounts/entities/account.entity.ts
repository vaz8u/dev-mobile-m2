import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Account {
    @PrimaryGeneratedColumn()
    @Field(() => Int, { description: 'Id of an account (generated)' })
    id: number;

    @Column()
    @Field(() => String)
    username: string;

    @Column()
    @Field(() => String)
    password: string;
}
