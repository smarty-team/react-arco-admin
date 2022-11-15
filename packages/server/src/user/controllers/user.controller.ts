import { Controller, UseGuards, HttpStatus, Post, Body, Query, Get, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/user.dto';
import { ApiOperation, ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import {
  BaseApiErrorResponse, BaseApiResponse, SwaggerBaseApiResponse
} from '../../shared/dtos/base-api-response.dto';
import { PaginationParams2Dto } from '../../shared/dtos/pagination-params.dto'
import { AuthGuard } from '@nestjs/passport';


@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  @ApiOperation({
    summary: '新增用户',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SwaggerBaseApiResponse(CreateUserDto),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @Post('')
  create(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }


  @ApiOperation({
    summary: '查找所有用户',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse([CreateUserDto]),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(
    @Query() query: PaginationParams2Dto
  ) {
    // console.log(query)
    const { data, count } = await this.userService.findAll(query);
    return {
      data,
      meta: { total: count }
    }
  }

  @ApiOperation({
    summary: '查找单个用户',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(CreateUserDto),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {
      data: await this.userService.findOne(id)
    }
  }

  @ApiOperation({
    summary: '更新单个用户',
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(CreateUserDto),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCourseDto: CreateUserDto) {
    return {
      data: await this.userService.update(id, updateCourseDto)
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({
    summary: '删除单个用户',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

}