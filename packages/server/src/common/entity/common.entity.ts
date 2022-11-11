import {
  Column, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn,
  CreateDateColumn,
  VersionColumn,
} from 'typeorm';

export abstract class Common {
  // 主键id
  @PrimaryGeneratedColumn()
  id: number;

  // 创建时间
  @CreateDateColumn()
  createTime: Date

  // 更新时间
  @UpdateDateColumn()
  updateTime: Date

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