import { ObjectId } from 'mongoose';
import { Entity, Column, UpdateDateColumn, ObjectIdColumn, CreateDateColumn, } from 'typeorm';

import { IsString, IsNotEmpty, IsNumber } from 'class-validator'
import { Common } from '../../shared/entities/common.entity';

@Entity()
export class Course extends Common {

    @Column({ default: null })
    @IsString()
    @IsNotEmpty()
    name: string;

}
