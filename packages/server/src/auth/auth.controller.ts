import { Body, Controller, Post, Get, HttpStatus } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { AuthService } from './auth.service';
import { TokenVO } from './vo/token.vo';
import { UserInfoSuccessVO } from './vo/user-info.vo';
import { ApiOperation, ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import {
  BaseApiErrorResponse, BaseApiResponse, SwaggerBaseApiResponse
} from '../shared/dtos/base-api-response.dto';

@ApiTags('认证鉴权')
@Controller('auth')
export class AuthController {
  constructor(
    private userService: AuthService
  ) { }

  @ApiOperation({
    summary: '用户注册',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(RegisterDTO),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @Post('register')
  async register(
    @Body() registerDTO: RegisterDTO
  ): Promise<UserInfoSuccessVO> {
    return this.userService.register(registerDTO)
  }


  @ApiOperation({
    summary: '用户登录',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(LoginDTO),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @Post('login')
  async login(
    @Body() loginDTO: LoginDTO
  ): Promise<TokenVO> {
    return this.userService.login(loginDTO)
  }


  @ApiOperation({
    summary: '当前用户信息',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(LoginDTO),
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @Get('info')
  async info(): Promise<any> {
    // return this.userService.login(loginDTO)
    return { data: { ok: 1 } }
  }


}
