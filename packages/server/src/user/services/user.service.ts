import { In, Like, Raw, MongoRepository } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { User } from '../entities/user.mongo.entity';
import { Role } from '../entities/role.mongo.entity'
import { CreateUserDto } from '../dtos/user.dto'
import { PaginationParams2Dto } from '../../shared/dtos/pagination-params.dto'

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: MongoRepository<User>,

    @Inject('ROLE_REPOSITORY')
    private roleRepository: MongoRepository<Role>
  ) { }

  async create(user) {
    return this.userRepository.save(user)
  }


  async findAll({ pageSize, page }: PaginationParams2Dto): Promise<{ data: User[], count: number }> {

    const [data, count] = await this.userRepository.findAndCount({
      order: { createdAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: (pageSize * 1),
      cache: true
    })
    return {
      data, count
    }
  }

  async findOne(id: string) {
    return await this.userRepository.findOneBy(id)
  }

  async update(id: string, user: CreateUserDto) {

    // 去除时间戳和id
    ['id', 'createdAt', 'updatedAt'].forEach(
      k => delete user[k]
    )
    // 更新时间戳
    // course.updatedAt = new Date()
    return await this.userRepository.update(id, user)
  }

  async remove(id: string): Promise<any> {
    return await this.userRepository.delete(id)
  }
}