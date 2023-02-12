import { IsNotEmpty, Matches } from "class-validator"
import { regMobileCN } from "@/shared/utils/regex.util";
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {

  /**
   * 手机号（系统唯一）
   */
  @Matches(regMobileCN, { message: '请输入正确手机号' })
  @IsNotEmpty({ message: '请输入手机号' })
  @ApiProperty({ example: '18888888888' })
  readonly phoneNumber: string;

  /**
   * 用户密码
   */
  @IsNotEmpty({ message: '请输入密码' })
  @ApiProperty({ example: '888888' })
  readonly password: string;
}