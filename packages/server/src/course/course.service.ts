import { Injectable, Inject } from '@nestjs/common';
import { CreateCourseDto } from './dtos/create-course.dto';
import { UpdateCourseDto } from './dtos/update-course.dto';
import { In, Like, Raw, MongoRepository, ObjectID } from 'typeorm';
import { Course } from './entities/course.mongo.entity'
import { PaginationParams2Dto } from '../shared/dtos/pagination-params.dto'
@Injectable()
export class CourseService {
  constructor(
    @Inject('COURSE_REPOSITORY')
    private courseRepository: MongoRepository<Course>
  ) { }


  async create(course: CreateCourseDto) {
    return await this.courseRepository.save(course)
  }

  async findAll({ pageSize, page }: PaginationParams2Dto): Promise<{ data: Course[], count: number }> {

    const [data, count] = await this.courseRepository.findAndCount({
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
    console.log('id', id)
    return await this.courseRepository.findOneBy(id)


  }

  async update(id: string, course: UpdateCourseDto) {
    // 去除时间戳和id
    ['_id', 'createdAt', 'updatedAt'].forEach(
      k => delete course[k]
    )

    return await this.courseRepository.update(id, course)
  }

  async remove(id: string): Promise<any> {
    // const r = await this.courseRepository.findOneBy(_id)
    // return await this.courseRepository.remove(r)
    return await this.courseRepository.delete(id)
  }
}
