import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({
    summary: '初始化数据',
  })
  @Post('init')
  initData(): string {



    // 初始化数据
    return '初始化成功';
  }
}
