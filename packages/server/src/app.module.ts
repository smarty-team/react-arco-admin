import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { SharedModule } from './shared/shared.module';
import { CMSModule } from './cms/cms.module';


@Module({
  imports: [
    SharedModule,
    UserModule,
    CourseModule,
    CMSModule
  ],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule { }
