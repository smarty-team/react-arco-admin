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

}
