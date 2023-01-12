import { Controller, UseGuards, HttpStatus, Post, Body, Query, Get, Patch, Param, Delete, UseInterceptors, Req, UploadedFile } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import {
    BaseApiErrorResponse, BaseApiResponse, SwaggerBaseApiResponse
} from '../../shared/dtos/base-api-response.dto';
import { PaginationParams2Dto } from '../../shared/dtos/pagination-params.dto'
import { AuthGuard } from '@nestjs/passport';

@ApiTags('系统维护')
@Controller('system')
export class SystemController {
    constructor(
    ) { }


    async spawn(...args) {
        const { spawn } = require('child_process');
        return new Promise(resolve => {
            const proc = spawn(...args)
            // proc.on('data', data => {
            //     console.log('>:' + data.toString())
            // })

            proc.stdout.pipe(process.stdout)
            proc.stderr.pipe(process.stderr)
            proc.on('close', () => {
                resolve('')
            })
        })
    }

    @ApiOperation({
        summary: '数据库备份列表',
    })
    @Get('/database')
    async list(@Body() data) {
        // await this.spawn('ls', ['-l'], { cwd: `./` })

        await this.spawn('docker-compose', [], { cwd: `./` })

        return {
            ok: 1
        }
    }

    @ApiOperation({
        summary: '数据库备份',
    })
    @Post('/database/backup')
    create(@Body() data) {
        console.log('/database/backup', data)
        return {
            ok: 1
        }
    }


}