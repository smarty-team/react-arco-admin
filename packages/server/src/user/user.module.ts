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


// import { TypeOrmModule } from '@nestjs/typeorm';

// import { User } from '../'


@Module({
  imports: [
    SharedModule,
    JwtModule.registerAsync({
      // inject: [ConfigService],  // 注入 ConfigService
      useFactory: () => ({
        // secret: process.env.JWT_SECRET, // 密钥
        secret: 'ranshu666',
        signOptions: {
          // expiresIn: process.env.JWT_EXPIRES_IN, // token 过期时效
          expiresIn: '24h'
        },
      }), // 获取配置信息
    }),
  ],
  controllers: [
    AuthController, UserController, RoleController
  ],
  providers: [...UserProviders, UserService, RoleService, AuthService, JwtStrategy],
  // exports: [UserService, ...UserProviders],
})
export class UserModule { }