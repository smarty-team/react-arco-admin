import {
    Body,
    Controller,
    DefaultValuePipe,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Patch,
    Query,
    Res,
    Scope,
    UseGuards,
    HttpStatus,

} from '@nestjs/common';
import { MenuService } from '../services/menu.service';

import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';

import {
    BaseApiErrorResponse, BaseApiResponse, SwaggerBaseApiResponse
} from '../../shared/dtos/base-api-response.dto';
import { PaginationParams2Dto } from '../../shared/dtos/pagination-params.dto'
import { CreateMenuDto, UpdateMenuDto } from '../dtos/menu.dto';
import * as path from 'path'
@ApiTags('菜单')
@Controller('menus')
export class MenuController {
    constructor(private readonly menuService: MenuService) { }

    @ApiOperation({
        summary: '更新菜单',
    })
    @ApiResponse({
        status: HttpStatus.CREATED,
        type: SwaggerBaseApiResponse(UpdateMenuDto),
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        type: BaseApiErrorResponse,
    })
    @Post()
    async create(@Body() updateMenuDto: UpdateMenuDto) {
        return {
            data: await this.menuService.update(updateMenuDto),
        }
    }

    @ApiOperation({
        summary: '查找所有菜单',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        type: SwaggerBaseApiResponse([CreateMenuDto]),
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        type: BaseApiErrorResponse,
    })
    @Get()
    async find(
    ) {

        const { data } = await this.menuService.find();
        return {
            data,
        }
    }


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

    getRootDir() {
        return path.resolve(__dirname, '../../../../../..')
    }

    @ApiOperation({
        summary: '刷新全部内容',
    })
    @ApiResponse({
        status: HttpStatus.CREATED,
        type: SwaggerBaseApiResponse(UpdateMenuDto),
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        type: BaseApiErrorResponse,
    })
    @Post('refresh')
    async refresh() {
        const cmsRoot = path.resolve(this.getRootDir(), './packages/cms')
        console.log('path:', cmsRoot)
        const log = await this.spawn('pnpm', ['build'], { cwd: cmsRoot })

        return {
            ok: 1,
            log
        }
    }

}
