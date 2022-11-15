import { Body, Controller, Post, Get, HttpStatus, Req, UseGuards, } from '@nestjs/common';
import { LoginDTO } from '../dtos/login.dto';
import { RegisterDTO } from '../dtos//register.dto';
import { AuthService } from '../services/auth.service';
import { TokenVO } from '../dtos/token.vo';
import { UserInfoSuccessVO } from '../dtos/user-info.vo';
import { ApiOperation, ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import {
  BaseApiErrorResponse, BaseApiResponse, SwaggerBaseApiResponse
} from '../../shared/dtos/base-api-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '@/user/services/user.service'

@ApiTags('认证鉴权')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
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
    return this.authService.register(registerDTO)
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
    return this.authService.login(loginDTO)
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
  @UseGuards(AuthGuard('jwt'))
  async info(@Req() req: any): Promise<any> {

    const data = await this.userService.findOne(req.user.id)
    console.log('Req', req.user, data)
    delete data.password
    // this.authService
    return { data }
  }


}
