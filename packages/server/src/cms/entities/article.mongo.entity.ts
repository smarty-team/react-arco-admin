import { PrimaryGeneratedColumn, Entity, Column, Unique, UpdateDateColumn, ObjectIdColumn, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { ObjectId } from 'mongoose';
import { Common } from '@/shared/entities/common.entity';
@Entity()
export class Article extends Common {

    @Column('text')
    name: string;

    @Column('text')
    content: string;

}
