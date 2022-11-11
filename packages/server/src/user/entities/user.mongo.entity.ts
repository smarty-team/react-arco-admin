import { Entity, Column, Unique, UpdateDateColumn, ObjectIdColumn, CreateDateColumn } from 'typeorm';
import { ObjectId } from 'mongoose';
@Entity()
export class User {
    @ObjectIdColumn()
    id?: ObjectId;

    // 昵称
    @Column('text')
    nickname: string;

    // 手机号
    @Column('text')
    mobile: string;

    @Column()
    password: string;

    // 加密盐
    @Column({
        type: 'text',
        select: false,
    })
    salt: string;

    @Column()
    isAccountDisabled?: boolean;

    // @Unique('email', ['email'])
    @Column({ length: 200 })
    email: string;

    @CreateDateColumn({ name: 'createdAt', nullable: true })
    createdAt?: Date;

    @UpdateDateColumn({ name: 'updatedAt', nullable: true })
    updatedAt?: Date;
}
