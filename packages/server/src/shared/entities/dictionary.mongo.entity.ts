import { PrimaryGeneratedColumn, Entity, Column, Unique, UpdateDateColumn, ObjectIdColumn, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { ObjectId } from 'mongoose';
import { Common } from '@/shared/entities/common.entity';
@Entity()
export class Dictionary extends Common {

    @Column('字典')
    data: object;

}
