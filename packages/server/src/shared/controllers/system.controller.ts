import { Controller, UseGuards, HttpStatus, Post, Body, Query, Get, Patch, Param, Delete, UseInterceptors, Req, UploadedFile } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import {
    BaseApiErrorResponse, BaseApiResponse, SwaggerBaseApiResponse
} from '../../shared/dtos/base-api-response.dto';
import { PaginationParams2Dto } from '../../shared/dtos/pagination-params.dto'
import { AuthGuard } from '@nestjs/passport';
import * as cpuStat from "cpu-stat"
import { promisify } from 'util'
import * as os from 'os'
import { SystemProviders } from '../system.providers';
import { SystemService } from '../services/system.service';
import { CreateDictionaryDto, UpdateDictionaryDto } from '../dtos/dictionary.dto';
import * as path from 'path'
import * as moment from 'moment'
import * as fse from 'fs-extra'
import * as fs from 'fs'
import { BackupDto } from '../dtos/backup.dto';
import { ensureDir } from 'fs-extra';

@ApiTags('系统维护')
@Controller('system')
export class SystemController {
    constructor(
        private readonly systemService: SystemService
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
            let ret = ''
            proc.stdout.on('data', data => {
                ret += data.toString()
            })
            proc.on('close', () => {
                resolve(ret)
            })
        })
    }

    getTime() {
        //转毫秒
        var n = new Date();
        console.log(n)
        return n.getFullYear() + (n.getMonth() + 1) + n.getDate() + n.getHours() + n.getMinutes() + n.getSeconds();
    }

    getRootDir() {
        return path.resolve(__dirname, '../../../../../..')
    }


    @ApiOperation({
        summary: '资源使用率',
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get('/system')
    async load(@Body() data) {

        const percent = await promisify(cpuStat.usagePercent)()
        const mem = ((os.totalmem() - os.freemem()) / os.totalmem())

        return {
            ok: 1,
            data: {
                cpu: percent,
                mem
            }
        }
    }


    @ApiOperation({
        summary: '数据字典',
    })
    @ApiResponse({
        status: HttpStatus.CREATED,
        type: SwaggerBaseApiResponse(UpdateDictionaryDto),
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post('/dictionary')
    async setDic(@Body() dto: UpdateDictionaryDto) {

        return {
            ok: 1,
            data: await this.systemService.update(dto)
        }
    }


    @ApiOperation({
        summary: '数据字典',
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get('/dictionary')
    async getDic(@Body() body) {
        const { data } = await this.systemService.find()
        return {
            ok: 1,
            data
        }
    }


    @ApiOperation({
        summary: '数据库备份列表',
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get('/database')
    async list() {

        const ret = await this.spawn('docker-compose', ['exec', '-T', 'mongo', 'ls', '/dump'], { cwd: './' })

        const data = ("" + ret).split('\n')
        data.pop()
        return {
            ok: 1,
            data
        }
    }

    @ApiOperation({
        summary: '数据库备份',
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post('/database/dump')
    async dump(@Body() data) {
        const ret = await this.spawn('docker-compose', ['exec', '-T', 'mongo', 'mongodump', '--db', 'nest-server', '--out', '/dump/' + moment().format('YYYYMMDDhhmmss')], { cwd: './' })
        return {
            ok: 1
        }
    }


    @ApiOperation({
        summary: '数据库恢复',
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post('/database/restore')
    async restore(@Body() dto: BackupDto) {
        console.log('恢复数据', dto.file)
        const ret = await this.spawn('docker-compose', ['exec', '-T', 'mongo', 'mongorestore', '--db', 'nest-server', `/dump/${dto.file}/nest-server`], { cwd: './' })

        return {
            ok: 1
        }
    }
}

