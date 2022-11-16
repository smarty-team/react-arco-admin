import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { CourseProviders } from './course.providers'
import { SharedModule } from '@/shared/shared.module';

// import { MongooseModule } from '@nestjs/mongoose';

// import { Course } from './entities/course.mongo.entity';

@Module({
  imports: [
    SharedModule
    // MongooseModule.forFeature([
    //   { name: Course.name, schema: Course },
    // ]),

  ],
  controllers: [CourseController],
  providers: [CourseService, ...CourseProviders]
})
export class CourseModule { }
