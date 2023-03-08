import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { encryptPassword, makeSalt } from '@/shared/utils/cryptogram.util';
import { LoginDTO } from '../dtos/login.dto';
import { UserInfoDto, RegisterDTO, RegisterSMSDTO, RegisterCodeDTO } from '../dtos/auth.dto';
import { User } from '../entities/user.mongo.entity';
import { Role } from '../entities/role.mongo.entity'
import { TokenVO } from '../dtos/token.vo';
import { JwtService } from '@nestjs/jwt';
import { In, Like, Raw, MongoRepository } from 'typeorm';
import { writeFile } from 'fs/promises';
import { join } from 'path'
import { UploadService } from '../../shared/upload/upload.service';
import { UserService } from './user.service';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { CaptchaService } from '../../shared/captcha/captcha.service';
import { AppLogger } from '../../shared/logger/logger.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly logger: AppLogger,

    @Inject('USER_REPOSITORY')
    private userRepository: MongoRepository<User>,

    @Inject('ROLE_REPOSITORY')
    private roleRepository: MongoRepository<Role>,

    private readonly jwtService: JwtService,

    private readonly uploadService: UploadService,

    private readonly userService: UserService,

    @InjectRedis() private readonly redis: Redis,

    private readonly captchaService: CaptchaService,

  ) {
    this.logger.setContext(AuthService.name);
  }


  async init() {
    // 清空数据
    this.clear()

    // 创建管理员角色
    let { _id: role } = await this.roleRepository.save({
      "name": "admin",
      "permissions": {
        "dashboard/workplace": [
          "write",
          "read"
        ],
        "user": [
          "read",
          "write"
        ],
        "course": [
          "write",
          "read"
        ],
        "role": [
          "read",
          "write"
        ]
      }
    })


    const admin = await this.register({
      "phoneNumber": "18888888888",
      "name": "管理员1",
      "password": "888888",
      "passwordRepeat": "888888",
    })

    // 添加角色权限
    admin.data.role = role
    this.userService.update(admin.data._id, admin.data)

    let { _id: role2 } = await this.roleRepository.save({
      "name": "user",
      "permissions": {
        "dashboard/workplace": [
          "write",
          "read"
        ],
        "course": [
          "write",
          "read"
        ],
      }
    })


    const user = await this.register({
      "phoneNumber": "13611177422",
      "name": "普通用户1",
      "password": "888888",
      "passwordRepeat": "888888"
    })

    // 添加角色权限
    user.data.role = role2
    this.userService.update(user.data._id, user.data)

  }


  clear() {
    this.userRepository.deleteMany({})
    this.roleRepository.deleteMany({})

    return { ok: 1 }
  }



  /**
   * 校验注册信息
   * @param registerDTO 
   */
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

  /**
   * 注册
   * @param registerDTO 
   * @returns 
   */
  async register(
    registerDTO: RegisterDTO
  ): Promise<any> {

    await this.checkRegisterForm(registerDTO)

    const { name, password, phoneNumber } = registerDTO;
    // const salt = makeSalt(); // 制作密码盐
    // const hashPassword = encryptPassword(password, salt);  // 加密密码

    const { salt, hashPassword } = this.getPassword(password)

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

  getPassword(password) {
    const salt = makeSalt(); // 制作密码盐
    const hashPassword = encryptPassword(password, salt);  // 加密密码
    return { salt, hashPassword }
  }

  /**
   * 短信注册
   * @param registerDTO 
   * @returns 
   */
  async registerBySMS(
    registerDTO: RegisterSMSDTO
  ): Promise<any> {


    const { phoneNumber, smsCode } = registerDTO;

    // 短信验证码校验
    const code = await this.getMobileVerifyCode(phoneNumber)
    if (smsCode !== code) {
      throw new NotFoundException('验证码不一致，或已过期')
    }

    let user = await this.userRepository
      .findOneBy({ phoneNumber })
    if (!user) {
      // 用户不存在匿名注册
      const password = makeSalt(8)
      user = await this.register({
        phoneNumber,
        name: `手机用户${makeSalt(8)}`,
        password,
        passwordRepeat: password
      })
    }

    const token = await this.certificate(user)
    return {
      data: {
        token
      }
    }

  }

  /**
   * 登陆校验用户信息
   * @param loginDTO 
   * @returns 
   */
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
    this.logger.log(null, 'Log Login...')
    this.logger.log(null, 'Debug Login...')
    this.logger.warn(null, 'Warn Login...')
    this.logger.error(null, 'Error Login...')
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

  /**
   * 上传
   */
  async uploadAvatar(id: string, file) {
    const { url } = await this.uploadService.upload(file)

    this.userService.update(id, { avatar: url })

    return { data: url }
  }

  /**
   * 获取验证码（四位随机数字）
   * @returns 
   */
  generateCode() {
    return [0, 0, 0, 0].map(() => (parseInt(Math.random() * 10 + ''))).join('')
  }

  async getMobileVerifyCode(mobile) {
    return await this.redis.get('verifyCode' + mobile);
  }

  /**
   * 获取短信验证码
   * @param mobile 
   */
  async registerCode(dto: RegisterCodeDTO) {

    // 验证图形验证码
    const captcha = await this.redis.get('captcha' + dto.captchaId);
    if (!captcha || captcha.toLocaleLowerCase() !== dto.captchaCode.toLocaleLowerCase()) {
      throw new NotFoundException('图形验证码错误')
    }

    const redisData = await this.getMobileVerifyCode(dto.phoneNumber);
    if (redisData !== null) {
      // 验证码未过期
      // 重复发送
      throw new NotFoundException('验证码未过期,无需再次发送')
    }

    // TODO 测试状态
    const code = this.generateCode()
    // const code = '0000'
    this.logger.log(null, '生成验证码：' + code)
    await this.redis.set('verifyCode' + dto.phoneNumber, code, "EX", 60);

    return code


    // phoneCodeList[phone] = code;

    // const smsParams = {
    //   "PhoneNumberSet": [
    //     `+86${phone}`
    //   ],
    //   "SmsSdkAppId": "xxxxx",
    //   "TemplateId": "12*****",
    //   "SignName": "dooring服务",
    //   "TemplateParamSet": [code]
    // };
    // try {
    //   const result = await client.SendSms(smsParams);
    //   if(result?.SendStatusSet.Code === 'Ok') {
    //     return {
    //       code: 200,
    //       msg: 'Success',
    //     };
    //   }else {
    //     return {
    //       code: 500,
    //       msg: `Service error: ${result?.SendStatusSet.Message}`,
    //     };
    //   }
    // }catch(err) {
    //   return {
    //     code: 500,
    //     msg: `Service error: ${err}`
    //   };
    // }

  }

  /**
   * 获取图形验证码
   */
  async getCaptcha() {
    const { data, text } = await this.captchaService.captche()
    const id = makeSalt(8)

    this.logger.log(null, '图形验证码:' + text)

    // 验证码存入将Redis
    this.redis.set('captcha' + id, text, "EX", 600);

    const image = `data:image/svg+xml;base64,${Buffer.from(data).toString('base64')}`
    return { id, image }
  }

}
