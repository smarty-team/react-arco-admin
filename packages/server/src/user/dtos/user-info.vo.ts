import { SuccessVO } from "@/common/dto/success.dto";

export class UserInfoItem {
  /**
   * 用户id
   */
  id: number;

  /**
   * 创建时间
   */
  createTime: Date

  /**
   * 更新时间
   */
  updateTime: Date

  /**
   * 手机号
   */
  mobile: string;
}

export class UserInfoVO {
  info: UserInfoItem
}

export class UserInfoSuccessVO extends SuccessVO {
  data: UserInfoVO
} 
