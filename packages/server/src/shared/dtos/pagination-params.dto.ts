import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class PaginationParamsDto {
    @ApiPropertyOptional({
        description: 'Optional, defaults to 100',
        type: Number,

    })
    @IsNumber()
    @IsOptional()
    @Min(0)
    @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
    limit = 100;

    @ApiPropertyOptional({
        description: 'Optional, defaults to 0',
        type: Number,
    })
    @IsNumber()
    @IsOptional()
    @Min(0)
    @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
    offset = 0;
}


export class PaginationParams2Dto {
    @ApiPropertyOptional({
        description: 'PageSize, defaults to 100',
        type: Number,
        example: 5
    })
    @IsNumber()
    @IsOptional()
    @Min(0)
    @Transform(({ value }) => parseInt(value, 10)
        , { toClassOnly: true })
    pageSize = 5;

    @ApiPropertyOptional({
        description: 'Page, defaults to 0',
        type: Number,
        example: 1
    })
    @IsNumber()
    @IsOptional()
    @Min(0)
    @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
    page = 1;
}