import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
    @ApiProperty({ example: '文章标题' })
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: '# markdown' })
    @IsNotEmpty()
    content: string;
}

export class UpdateArticleDto extends PartialType(CreateArticleDto) {

}
