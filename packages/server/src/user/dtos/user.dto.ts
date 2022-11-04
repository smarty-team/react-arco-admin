import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateUserDto {

    @ApiProperty({ example: 'cookie' })
    @IsNotEmpty()
    name: string;

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