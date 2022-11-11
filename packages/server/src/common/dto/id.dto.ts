import { IsNotEmpty, Matches } from "class-validator";
import { regPositive } from "@/utils/regex.util";

export class IdDTO {

  /**
   * 主键 id
   */
  @IsNotEmpty({ message: 'id 不能为空' })
  @Matches(regPositive, { message: '请输入有效 id' })
  readonly id: number
}