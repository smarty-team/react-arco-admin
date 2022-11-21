import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { encryptPassword, makeSalt } from '@/shared/utils/cryptogram.util';
import { LoginDTO } from '../dtos/login.dto';
import { RegisterDTO } from '../dtos/register.dto';
import { UserInfoDto } from '../dtos/user-info'
import { User } from '../entities/user.mongo.entity';
import { Role } from '../entities/role.mongo.entity'
import { TokenVO } from '../dtos/token.vo';
import { JwtService } from '@nestjs/jwt';
import { In, Like, Raw, MongoRepository } from 'typeorm';

@Injectable()
export class AuthService {

  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: MongoRepository<User>,


    @Inject('ROLE_REPOSITORY')
    private roleRepository: MongoRepository<Role>,

    private readonly jwtService: JwtService
  ) { }



  // 校验注册信息
  async checkRegisterForm(
    registerDTO: RegisterDTO,
  ): Promise<any> {

    if (registerDTO.password !== registerDTO.passwordRepeat) {
      throw new NotFoundException('两次输入的密码不一致，请检查')
    }
    const { phoneNumber } = registerDTO
    const hasUser = await this.userRepository
      .findOneBy({ phoneNumber })
    if (hasUser) {
      throw new NotFoundException('用户已存在')
    }
  }

  // 注册
  async register(
    registerDTO: RegisterDTO
  ): Promise<any> {

    await this.checkRegisterForm(registerDTO)

    const { name, password, phoneNumber } = registerDTO;
    const salt = makeSalt(); // 制作密码盐
    const hashPassword = encryptPassword(password, salt);  // 加密密码

    const newUser: User = new User()
    newUser.name = name
    newUser.phoneNumber = phoneNumber
    newUser.password = hashPassword
    newUser.salt = salt
    const data = await this.userRepository.save(newUser)
    delete data.password
    delete data.salt
    return {
      data
    }
  }

  // 登陆校验用户信息
  async checkLoginForm(
    loginDTO: LoginDTO
  ): Promise<any> {
    const { phoneNumber, password } = loginDTO
    const user = await this.userRepository
      .findOneBy({ phoneNumber })

    if (!user) {
      throw new NotFoundException('用户不存在')
    }
    const { password: dbPassword, salt } = user
    const currentHashPassword = encryptPassword(password, salt);
    // console.log({ currentHashPassword, dbPassword })
    if (currentHashPassword !== dbPassword) {
      throw new NotFoundException('密码错误')
    }

    return user
  }

  // 生成 token
  async certificate(user: User) {
    const payload = {
      id: user._id
    };
    const token = this.jwtService.sign(payload);
    return token
  }

  async login(
    loginDTO: LoginDTO
  ): Promise<TokenVO> {
    const user = await this.checkLoginForm(loginDTO)
    const token = await this.certificate(user)
    return {
      data: {
        token
      }
    }
  }


  async info(id: string) {
    // 查询用户并获取权限
    const user = await this.userRepository.findOneBy(id)
    const data: UserInfoDto = Object.assign({}, user)
    if (user.role) {
      const role = await this.roleRepository.findOneBy(user.role)
      if (role) data.permissions = role.permissions
    }

    return data

  }

}
