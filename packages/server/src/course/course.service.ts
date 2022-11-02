import { Injectable, Inject } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { In, Like, Raw, MongoRepository, ObjectID } from 'typeorm';
import { Course } from './entities/course.mongo.entity'
import { PaginationParams2Dto } from '../shared/dto/pagination-params.dto'
@Injectable()
export class CourseService {
  constructor(
    @Inject('COURSE_REPOSITORY')
    private courseRepository: MongoRepository<Course>
  ) { }


  async create(course: Course) {
    return this.courseRepository.save(course)
  }

  async findAll({ pageSize, page }: PaginationParams2Dto): Promise<{ list: Course[], total: number }> {

    const [list, count] = await this.courseRepository.findAndCount({
      order: { createdAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: (pageSize * 1),
      cache: true
    })
    return {
      list, total: count
    }
  }

  async findOne(_id: string) {
    // return await this.courseRepository.findOneBy({ _id: id })
    let ret = null
    ret = await this.courseRepository.findOneBy(_id)
    return ret
  }

  async update(_id: string, updateCourseDto: UpdateCourseDto) {
    // const r = await this.courseRepository.findOneBy(_id)
    console.log(_id, updateCourseDto)
    return await this.courseRepository.update(_id, updateCourseDto)
  }

  async remove(id: string): Promise<any> {
    // const r = await this.courseRepository.findOneBy(_id)
    // return await this.courseRepository.remove(r)
    return await this.courseRepository.delete(id)
  }
}
