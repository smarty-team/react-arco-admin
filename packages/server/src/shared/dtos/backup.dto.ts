import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';
import { regMobileCN } from "@/shared/utils/regex.util";

export class BackupDto {

    @ApiProperty({ example: 'init' })
    @IsNotEmpty()
    file?: string;

}