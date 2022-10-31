import { ObjectId } from 'mongoose';
import { Entity, Column, UpdateDateColumn, ObjectIdColumn, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Course {

    @ObjectIdColumn()
    _id?: ObjectId;

    @Column({ default: null })
    name: string;
}
