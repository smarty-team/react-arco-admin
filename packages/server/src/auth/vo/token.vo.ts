import { SuccessVO } from "@/common/dto/success.dto";

export class TokenItem {
  /**
   * token
   */
  token: string;
}

export class TokenVO {
  info: TokenItem
}

export class TokenSuccessVO extends SuccessVO{
  data: {
    info: TokenItem
  }
} 
