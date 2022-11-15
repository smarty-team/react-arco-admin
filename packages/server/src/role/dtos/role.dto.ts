import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';
import { regMobileCN } from "@/utils/regex.util";

export class CreateRoleDto {

    @ApiProperty({ example: 'admin' })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: [{ name: '菜单一', permissions: ['*'] }] })
    @IsNotEmpty()
    permissions: object;

}