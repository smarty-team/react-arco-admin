import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';
import { regMobileCN } from "@/shared/utils/regex.util";

export class CreateUserDto {

    /**
    * 手机号（系统唯一）
    */
    @Matches(regMobileCN, { message: '请输入正确手机号' })
    @IsNotEmpty({ message: '请输入手机号' })
    @ApiProperty({ example: '13611177421' })
    readonly phoneNumber?: string;

    @ApiProperty({ example: '然叔' })
    @IsNotEmpty()
    name?: string;

    @ApiProperty({ example: '123456' })
    @IsNotEmpty()
    password?: string;

    salt?: string;

    @ApiProperty({ example: '15906475@qq.com' })
    @IsNotEmpty()
    email?: string;

    @ApiProperty({ example: 'cookieboty' })
    @IsNotEmpty()
    avatar?: string;

    @ApiProperty({ example: 'frontend' })
    @IsNotEmpty()
    job?: string;

    @ApiProperty({ example: '前端开发工程师' })
    @IsNotEmpty()
    jobName?: string;

    @ApiProperty({ example: 'cookieboty' })
    @IsNotEmpty()
    organization?: string;

    @ApiProperty({ example: 'beijing' })
    @IsNotEmpty()
    location?: string;

    @ApiProperty({ example: 'cookieboty' })
    @IsNotEmpty()
    personalWebsite?: string;

    @ApiProperty({ example: '637855e9e8c408970ef9f4de' })
    role?;

}