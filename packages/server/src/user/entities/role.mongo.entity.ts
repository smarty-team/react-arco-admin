import { PrimaryGeneratedColumn, Entity, Column, Unique, UpdateDateColumn, ObjectIdColumn, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { ObjectId } from 'mongoose';
import { User } from './user.mongo.entity';
import { Common } from '@/shared/entities/common.entity';
@Entity()
export class Role extends Common {

    // 角色名
    @Column('text')
    name: string;

    // 权限
    @Column('')
    permissions: object;

}
