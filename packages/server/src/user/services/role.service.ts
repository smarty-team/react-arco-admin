import { In, Like, Raw, MongoRepository } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { Role } from '../entities/role.mongo.entity';
import { CreateRoleDto } from '../dtos/role.dto'
import { PaginationParams2Dto } from '../../shared/dtos/pagination-params.dto'

@Injectable()
export class RoleService {
  constructor(
    @Inject('ROLE_REPOSITORY')
    private RoleRepository: MongoRepository<Role>
  ) { }

  create(Role) {
    return this.RoleRepository.save(Role)
  }


  async findAll({ pageSize, page }: PaginationParams2Dto): Promise<{ data: Role[], count: number }> {

    const [data, count] = await this.RoleRepository.findAndCount({
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
    return await this.RoleRepository.findOneBy(id)


  }

  async update(id: string, Role: CreateRoleDto) {

    // 去除时间戳和id
    ['_id', 'createdAt', 'updatedAt'].forEach(
      k => delete Role[k]
    )
    // 更新时间戳
    // course.updatedAt = new Date()
    return await this.RoleRepository.update(id, Role)
  }

  async remove(id: string): Promise<any> {
    return await this.RoleRepository.delete(id)
  }
}