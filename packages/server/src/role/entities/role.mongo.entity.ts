import { Entity, Column, Unique, UpdateDateColumn, ObjectIdColumn, CreateDateColumn } from 'typeorm';
import { ObjectId } from 'mongoose';
@Entity()
export class Role {
    @ObjectIdColumn()
    id?: ObjectId;

    // 角色名
    @Column('text')
    name: string;

    // 权限
    @Column('')
    permissions: object;

    @CreateDateColumn({ name: 'createdAt', nullable: true })
    createdAt?: Date;

    @UpdateDateColumn({ name: 'updatedAt', nullable: true })
    updatedAt?: Date;
}