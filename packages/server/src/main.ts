import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { generateDocument } from './doc'
import { join } from 'path'
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { RemoveSensitiveInfoInterceptor } from './shared/interceptors/remove-sensitive-info.interceptor';


async function bootstrap() {
  // const app = await NestFactory.create(AppModule);

  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.useGlobalPipes(new ValidationPipe({
    forbidUnknownValues: false
  }))

  app.useGlobalInterceptors(new RemoveSensitiveInfoInterceptor())

  // const app = await NestFactory.create<NestFastifyApplication>(
  //   AppModule,
  //   new FastifyAdapter(),
  // );

  const uploadDir = (!!process.env.UPLOAD_DIR && process.env.UPLOAD_DIR !== '') ? process.env.UPLOAD_DIR : join(__dirname, '..', 'static/upload')
  console.log('uploadDir:', uploadDir)
  // 静态服务
  app.useStaticAssets(uploadDir, {
    prefix: '/static/upload',
  });


  // 创建文档
  generateDocument(app)
  // await app.listen(3000, '0.0.0.0');
  console.log('APPPROT', process.env.APP_PORT)
  await app.listen(process.env.APP_PORT);
}
bootstrap();
