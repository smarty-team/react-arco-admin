import { Controller, Post, Body, Query, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { AddUserDto } from './user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  @ApiOperation({
    summary: '新增用户',
  })
  @Post('')
  create(@Body() user: AddUserDto) {
    return this.userService.createOrSave(user);
  }
}