import { Module } from '@nestjs/common';
import { User } from '../user/entities/user.mongo.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { DatabaseModule } from '@/common/database/database.module';
import { UserProviders } from '@/user/user.providers';

@Module({
  imports: [
    // TypeOrmModule.forFeature([User]),
    DatabaseModule,
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
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, ...UserProviders]
})
export class AuthModule { }
