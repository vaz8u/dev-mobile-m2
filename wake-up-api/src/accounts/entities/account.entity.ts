import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Account {
    @PrimaryColumn()
    @Field(() => String)
    username: string;

    @Column()
    @Field(() => String)
    password: string;
}
