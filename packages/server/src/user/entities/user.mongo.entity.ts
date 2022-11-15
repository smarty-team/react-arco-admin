import { Entity, Column, Unique, UpdateDateColumn, ObjectIdColumn, CreateDateColumn, ManyToMany, JoinTable, OneToOne } from 'typeorm';
import { ObjectId } from 'mongoose';
import { Role } from './role.mongo.entity';
import { Common } from '@/shared/entities/common.entity';

@Entity()
export class User extends Common {

    // 昵称
    @Column('text')
    name: string;


    @Column('text')
    avatar: string;

    // @Unique('email', ['email'])
    @Column({ length: 200 })
    email: string;

    // 手机号
    @Column('text')
    phoneNumber: string;

    @Column()
    password: string;

    @Column()
    role?: ObjectId

    @Column()
    job: string;

    @Column()
    jobName: string;

    @Column()
    organization: string;

    @Column()
    organizationName: string;

    @Column()
    location: string;

    @Column()
    locationName: string;

    @Column()
    introduction: string;

    @Column()
    personalWebsite: string;

    @Column("boolean")
    verified: boolean;

    // 加密盐
    @Column({
        type: 'text',
        select: false,
    })
    salt: string;

    @Column()
    isAccountDisabled?: boolean;
}
