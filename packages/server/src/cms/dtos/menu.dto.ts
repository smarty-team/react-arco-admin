import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMenuDto {
    @ApiProperty({
        example: [{
            key: 'xxx',
            title: '一级标题',
            type: 'category',
            children: [
                {
                    key: 'xxx',
                    title: '文章一',
                    type: 'article',
                }
            ]
        }]
    })
    @IsNotEmpty()
    menus: any[];
}

export class UpdateMenuDto extends PartialType(CreateMenuDto) {

}
