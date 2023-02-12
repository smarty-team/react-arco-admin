import { Controller, Delete, Get, Post, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RegisterDTO } from './user/dtos/auth.dto';
import { AuthService } from './user/services/auth.service';



@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,

  ) { }

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  // @ApiOperation({
  //   summary: '初始化数据',
  // })
  // @Post('init')
  // async init() {
  //   return await this.authService.init()
  // }

  // @ApiOperation({
  //   summary: '清空数据',
  // })
  // @Delete('del')
  // async clear() {
  //   return await this.authService.clear()
  // }
}
