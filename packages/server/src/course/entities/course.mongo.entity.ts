import { ObjectId } from 'mongoose';
import { Entity, Column, UpdateDateColumn, ObjectIdColumn, CreateDateColumn, } from 'typeorm';

import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

@Entity()
export class Course {

    @ObjectIdColumn()
    id?: ObjectId;

    @Column({ default: null })
    @IsString()
    @IsNotEmpty()
    name: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt?: string

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt?: string
}
