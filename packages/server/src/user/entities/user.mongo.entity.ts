import { Entity, Column, Unique, UpdateDateColumn, ObjectIdColumn, CreateDateColumn } from 'typeorm';
import { ObjectId } from 'mongoose';
@Entity()
export class User {
    @ObjectIdColumn()
    id?: ObjectId;

    @Column({ default: null })
    name: string;

    @Column()
    password: string;

    // @Unique('username', ['username'])
    @Column({ length: 200 })
    username: string;

    // @Column('simple-array')
    // roles?: string[];

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
