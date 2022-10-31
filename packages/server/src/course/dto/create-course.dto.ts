import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateCourseDto {
    @ApiProperty({ example: 'Vue源码课' })
    @IsNotEmpty()
    name: string;
}
