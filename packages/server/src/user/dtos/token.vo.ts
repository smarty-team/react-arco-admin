import { SuccessVO } from "@/shared/dtos/success.dto";

export class TokenItem {
  /**
   * token
   */
  token: string;
}

export class TokenVO {
  data: TokenItem
}
