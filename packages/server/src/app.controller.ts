import { Controller, Delete, Get, Post, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RegisterDTO } from './user/dtos/register.dto';



@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,

  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({
    summary: '初始化数据',
  })
  @Post('init')
  init() {
    return this.appService.init()
  }

  @ApiOperation({
    summary: '清空数据',
  })
  @Delete('del')
  clear() {
    return this.appService.clear()
  }
}
