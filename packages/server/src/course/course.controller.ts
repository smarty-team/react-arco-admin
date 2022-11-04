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

} from '@nestjs/common'; import { CourseService } from './course.service';
import { CreateCourseDto } from './dtos/create-course.dto';
import { UpdateCourseDto } from './dtos/update-course.dto';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';

import {
  BaseApiErrorResponse, BaseApiResponse, SwaggerBaseApiResponse
} from '../shared/dtos/base-api-response.dto';
import { PaginationParams2Dto } from '../shared/dtos/pagination-params.dto'
@ApiTags('课程')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  @ApiOperation({
    summary: '新增课程',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SwaggerBaseApiResponse(CreateCourseDto),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    return {
      data: await this.courseService.create(createCourseDto),
    }
  }

  @ApiOperation({
    summary: '查找所有课程',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse([CreateCourseDto]),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @Get()
  async findAll(
    @Query() query: PaginationParams2Dto
  ) {
    // console.log(query)
    const { data, count } = await this.courseService.findAll(query);
    return {
      data,
      mata: { total: count }
    }
  }

  @ApiOperation({
    summary: '查找单个课程',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(CreateCourseDto),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {
      data: await this.courseService.findOne(id)
    }
  }

  @ApiOperation({
    summary: '更新单个课程',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(CreateCourseDto),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return {
      data: await this.courseService.update(id, updateCourseDto)
    }
  }

  @ApiOperation({
    summary: '删除单个课程',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }
}
