import { IsNotEmpty, Matches } from "class-validator"
import { regMobileCN } from "@/shared/utils/regex.util";
import { ApiProperty } from '@nestjs/swagger';

export class RegisterCodeDTO {

  /**
   * 手机号（系统唯一）
   */
  @Matches(regMobileCN, { message: '请输入正确手机号' })
  @IsNotEmpty({ message: '请输入手机号' })
  @ApiProperty({ example: '13611177421' })
  readonly phoneNumber: string;

}