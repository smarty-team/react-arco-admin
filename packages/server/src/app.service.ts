import { Inject, Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { User } from './user/entities/user.mongo.entity';
import { Role } from './user/entities/role.mongo.entity';
import { UserService } from './user/services/user.service';
import { AuthService } from './user/services/auth.service';

@Injectable()
export class AppService {
  constructor(
    private userService: UserService,
    private authService: AuthService,

    @Inject('USER_REPOSITORY')
    private userRepository: MongoRepository<User>,

    @Inject('ROLE_REPOSITORY')
    private roleRepository: MongoRepository<Role>,

  ) {

  }

  getHello(): string {
    return 'Hello World!';
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


    const admin = await this.authService.register({
      "phoneNumber": "13611177421",
      "name": "管理员1",
      "password": "888888",
      "passwordRepeat": "888888",
    })

    // 添加角色权限
    admin.data.role = role
    console.log(admin)
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


    const user = await this.authService.register({
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



}
