import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiTags('课程')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  @ApiOperation({
    summary: '新增课程',
  })
  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @ApiOperation({
    summary: '查找所有课程',
  })
  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @ApiOperation({
    summary: '查找单个课程',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  @ApiOperation({
    summary: '更新单个课程',
  })

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(id, updateCourseDto);
  }

  @ApiOperation({
    summary: '删除单个课程',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }
}
