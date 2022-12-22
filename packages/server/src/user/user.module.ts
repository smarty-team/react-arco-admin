import { Module } from '@nestjs/common';
import { SharedModule } from '@/shared/shared.module';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { RoleController } from './controllers/role.controller';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { RoleService } from './services/role.service';
import { UserProviders } from './user.providers';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

import { RedisModule } from '@nestjs-modules/ioredis';
// import { TypeOrmModule } from '@nestjs/typeorm';

// import { User } from '../'
import { ConfigService } from '@nestjs/config';


@Module({
  imports: [
    SharedModule,
    JwtModule.registerAsync({
      inject: [ConfigService],  // 注入 ConfigService
      imports: [SharedModule],
      useFactory: (configService: ConfigService) => (configService.get('jwt'))
    }),
    RedisModule.forRootAsync({
      imports: [SharedModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        config: configService.get('redis')
      })
    }),

  ],
  controllers: [
    AuthController, UserController, RoleController
  ],
  providers: [...UserProviders, UserService, RoleService, AuthService, JwtStrategy],
  exports: [UserService, AuthService, ...UserProviders],

})
export class UserModule { }