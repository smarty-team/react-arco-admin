import { Common } from '@/common/entity/common.entity';
import { 
  Entity, 
  Column,
} from 'typeorm';

@Entity()
export class User extends Common{
  // 昵称
  @Column('text')
  nickname: string;

  // 手机号
  @Column('text')
  mobile: string;

  // 加密后的密码
  @Column({ 
    type: 'text',
    select: false,
  })
  password: string;

  // 加密盐
  @Column({
    type: 'text',
    select: false,
  })
  salt: string;
}