import { PrimaryGeneratedColumn, Entity, Column, Unique, UpdateDateColumn, ObjectIdColumn, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { ObjectId } from 'mongoose';
import { Common } from '@/shared/entities/common.entity';
@Entity()
export class Menu extends Common {

    // 菜单
    @Column('')
    menus: [];

}
