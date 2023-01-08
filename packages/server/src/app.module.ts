import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { SharedModule } from './shared/shared.module';
import { CMSModule } from './cms/cms.module';
import { AnalyticsModule } from './analytics/analytics.module';


@Module({
  imports: [
    SharedModule,
    UserModule,
    CourseModule,
    CMSModule,
    AnalyticsModule
  ],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule { }
