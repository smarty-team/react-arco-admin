import { In, Like, Raw, MongoRepository } from 'typeorm';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.mongo.entity';
import { Role } from '../entities/role.mongo.entity'
import { CreateUserDto } from '../dtos/user.dto'
import { PaginationParams2Dto } from '../../shared/dtos/pagination-params.dto'
import { UploadService } from '../../shared/upload/upload.service';
import { AuthService } from './auth.service';
import { makeSalt, encryptPassword } from '../../shared/utils/cryptogram.util';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: MongoRepository<User>,

    @Inject('ROLE_REPOSITORY')
    private roleRepository: MongoRepository<Role>,

    private uploadService: UploadService,


  ) { }

  async create(user) {
    return this.userRepository.save(user)
  }


  async findAll({ pageSize, page }: PaginationParams2Dto): Promise<{ data: User[], count: number }> {

    const [data, count] = await this.userRepository.findAndCount({
      order: { createdAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: (pageSize * 1),
      cache: true,
    })


    const roles = await this.roleRepository.findBy({})


    data.map(user => {
      const index = roles.findIndex(role => '' + user.role === '' + role._id)
      if (index !== -1) {
        user['roleData'] = roles[index]
      }
    })

    data.map(v => {
      Reflect.deleteProperty(v, 'password')
      Reflect.deleteProperty(v, 'salt')
    })

    return {
      data, count
    }
  }

  async findOne(id: string) {
    const ret = await this.userRepository.findOneBy(id)
    console.log('ret', ret)
    if (ret) {
      Reflect.deleteProperty(ret, 'password')
      Reflect.deleteProperty(ret, 'salt')
      return ret
    }
  }

  async update(id: string, user: CreateUserDto) {

    // 去除时间戳和id
    ['_id', 'createdAt', 'updatedAt'].forEach(
      k => Reflect.deleteProperty(user, k)
    )
    console.log('user', user)
    /// 如果更新密码
    if (user.password) {

      const { salt, hashPassword } = this.getPassword(user.password)

      user.salt = salt
      user.password = hashPassword
    }

    return await this.userRepository.update(id, user)
  }

  async remove(id: string): Promise<any> {
    return await this.userRepository.delete(id)
  }

  /**
 * 上传头像
 */
  async uploadAvatar(file) {
    const { url } = await this.uploadService.upload(file)
    return { data: url }
  }

  getPassword(password) {
    const salt = makeSalt(); // 制作密码盐
    const hashPassword = encryptPassword(password, salt);  // 加密密码
    return { salt, hashPassword }
  }

}