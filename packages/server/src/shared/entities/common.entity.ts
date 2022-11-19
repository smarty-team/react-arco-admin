import {
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  VersionColumn,
  ObjectID,
  ObjectIdColumn
} from 'typeorm';

export abstract class Common {
  // // 主键id
  // @PrimaryGeneratedColumn()
  // _id: string;

  @ObjectIdColumn()
  _id: ObjectID;

  // 创建时间
  @CreateDateColumn()
  createdAt: Date

  // 更新时间
  @UpdateDateColumn()
  updatedAt: Date

  // 软删除
  @Column({
    default: false,
    select: false,
  })
  isDelete: boolean

  // 更新次数
  @VersionColumn({
    select: false
  })
  version: number
}