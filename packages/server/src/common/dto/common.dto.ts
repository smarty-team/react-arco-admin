import { IdDTO } from "./id.dto";

export class CommonDTO extends IdDTO {
  /**
   * 创建时间
   */
  readonly createTime: Date

  /**
   * 更新时间
   */
  readonly updateTime: Date


  /**
   * 是否删除
   */
  isDelete: boolean

  /**
   * 更新次数
   */
  version: number

}