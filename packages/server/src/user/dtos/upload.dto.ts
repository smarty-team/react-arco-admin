
import { ApiProperty } from '@nestjs/swagger';


export class UploadDTO {

    @ApiProperty({ example: 'xxx' })
    name: string;


    /**
     * 手机号（系统唯一）
     */
    @ApiProperty({ type: 'string', format: 'binary', required: true })
    file: Express.Multer.File;



}