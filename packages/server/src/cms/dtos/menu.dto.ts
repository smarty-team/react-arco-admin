import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMenuDto {
    @ApiProperty({
        example: {
            title: '一级标题',
            articles: [
                '111'
            ],
            children: [
                {
                    name: '二级标题',
                    articles: ['2222'],
                }
            ]
        }
    })
    @IsNotEmpty()
    menus: object;
}

export class UpdateMenuDto extends PartialType(CreateMenuDto) {

}
