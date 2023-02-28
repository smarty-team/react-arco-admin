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
    UploadedFile,

} from '@nestjs/common';
import { MenuService } from '../services/menu.service';

import { ApiOperation, ApiTags, ApiResponse, ApiConsumes, ApiBearerAuth } from '@nestjs/swagger';

import {
    BaseApiErrorResponse, BaseApiResponse, SwaggerBaseApiResponse
} from '../../shared/dtos/base-api-response.dto';
import { PaginationParams2Dto } from '../../shared/dtos/pagination-params.dto'
import { CreateMenuDto, UpdateMenuDto } from '../dtos/menu.dto';
import { ArticleService } from '../services/article.service';

import * as path from 'path'
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadDTO } from '@/user/dtos/upload.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('菜单')
@Controller('menus')
export class MenuController {
    constructor(private readonly menuService: MenuService,
        private readonly articleService: ArticleService) { }

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
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
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
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post('refresh')
    async refresh() {
        // const cmsRoot = path.resolve(this.getRootDir(), './packages/cms')
        // console.log('path:', cmsRoot)
        const log = await this.spawn('pm2', ['restart', 'cms'], { cwd: './' })

        return {
            ok: 1,
            log
        }
    }


    @ApiOperation({
        summary: '文章导入',
    })
    @Post('/article/import')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file'))
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async articleImport(@UploadedFile() file,
        @Body() uploadDTO: UploadDTO,) {
        // 执行上传
        this.menuService.import(file)
        return {
            ok: 1
        }
    }


}
