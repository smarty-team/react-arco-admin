import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';
import { regMobileCN } from "@/shared/utils/regex.util";
import { IdDTO } from '@/shared/dtos/id.dto'

export class CreateRoleDto extends IdDTO {

    @ApiProperty({ example: 'admin' })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: [{ name: '菜单一', permissions: ['*'] }] })
    @IsNotEmpty()
    permissions: object;

}