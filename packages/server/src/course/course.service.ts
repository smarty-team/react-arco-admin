import { Injectable, Inject } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { In, Like, Raw, MongoRepository, ObjectID } from 'typeorm';
import { Course } from './entities/course.mongo.entity'

@Injectable()
export class CourseService {
  constructor(
    @Inject('COURSE_REPOSITORY')
    private courseRepository: MongoRepository<Course>
  ) { }


  async create(course: Course) {
    return this.courseRepository.save(course)
  }

  async findAll({ skip, limit }): Promise<Course[]> {
    return await this.courseRepository.find({
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
      cache: true
    })
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
