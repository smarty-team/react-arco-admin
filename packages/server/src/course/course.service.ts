import { Injectable, Inject } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { In, Like, Raw, MongoRepository, ObjectID } from 'typeorm';
import { Course } from './entities/course.mongo.entity'
import { PaginationParams2Dto } from '../shared/dtos/pagination-params.dto'
@Injectable()
export class CourseService {
  constructor(
    @Inject('COURSE_REPOSITORY')
    private courseRepository: MongoRepository<Course>
  ) { }


  async create(course: Course) {
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
    // return await this.courseRepository.findOneBy({ _id: id })
    console.log('id', id)
    return await this.courseRepository.findOneBy(id)


  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    // const r = await this.courseRepository.findOneBy(_id)
    // 删除时间戳
    const update: UpdateCourseDto = {
      name: updateCourseDto.name
    }

    return await this.courseRepository.update(id, update)
  }

  async remove(id: string): Promise<any> {
    // const r = await this.courseRepository.findOneBy(_id)
    // return await this.courseRepository.remove(r)
    return await this.courseRepository.delete(id)
  }
}
