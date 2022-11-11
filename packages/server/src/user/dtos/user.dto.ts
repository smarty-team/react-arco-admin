import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';
import { regMobileCN } from "@/utils/regex.util";

export class CreateUserDto {

    /**
        * 手机号（系统唯一）
       */
    @Matches(regMobileCN, { message: '请输入正确手机号' })
    @IsNotEmpty({ message: '请输入手机号' })
    @ApiProperty({ example: '13611177421' })
    readonly mobile: string;


    @ApiProperty({ example: '然叔' })
    @IsNotEmpty()
    nickname: string;

    @ApiProperty({ example: '123456' })
    @IsNotEmpty()
    password: string;

    @ApiProperty({ example: 'cookieboty@qq.com' })
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'cookieboty' })
    @IsNotEmpty()
    username: string;
}