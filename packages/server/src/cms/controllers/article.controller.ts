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
import { ArticleService } from '../services/article.service';

import { ApiOperation, ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import {
  BaseApiErrorResponse, BaseApiResponse, SwaggerBaseApiResponse
} from '../../shared/dtos/base-api-response.dto';
import { PaginationParams2Dto } from '../../shared/dtos/pagination-params.dto'
import { CreateArticleDto, UpdateArticleDto } from '../dtos/article.dto';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('文章')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }

  @ApiOperation({
    summary: '新增文章',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SwaggerBaseApiResponse(CreateArticleDto),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createCourseDto: CreateArticleDto) {
    return {
      data: await this.articleService.create(createCourseDto),
    }
  }

  @ApiOperation({
    summary: '查找所有文章',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse([CreateArticleDto]),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @Get()
  async findAll(
    @Query() query: PaginationParams2Dto
  ) {

    const { data, count } = await this.articleService.findAll(query);
    return {
      data,
      meta: { total: count }
    }
  }

  @ApiOperation({
    summary: '查找单个文章',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(CreateArticleDto),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {
      data: await this.articleService.findOne(id)
    }
  }

  @ApiOperation({
    summary: '更新单个文章',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(CreateArticleDto),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCourseDto: UpdateArticleDto) {
    return {
      data: await this.articleService.update(id, updateCourseDto)
    }
  }

  @ApiOperation({
    summary: '删除单个文章',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(id);
  }
}
