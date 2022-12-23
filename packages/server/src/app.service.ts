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

}
