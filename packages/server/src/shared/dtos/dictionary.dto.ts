import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateDictionaryDto {
    @ApiProperty({
        example: {
            'PASS_MAX_DAYS': {
                description: '密码过期时间(天)',
                value: 90
            }

        }
    })
    @IsNotEmpty()
    data: [];
}

export class UpdateDictionaryDto extends PartialType(CreateDictionaryDto) {

}
