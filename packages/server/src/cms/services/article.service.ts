import { Injectable, Inject } from '@nestjs/common';
import { In, Like, Raw, MongoRepository, ObjectID } from 'typeorm';
import { Article } from '../entities/article.mongo.entity'
import { PaginationParams2Dto } from '../../shared/dtos/pagination-params.dto'
import { CreateArticleDto, UpdateArticleDto } from '../dtos/article.dto';
@Injectable()
export class ArticleService {
  constructor(
    @Inject('ARTICLE_REPOSITORY')
    private articleRepository: MongoRepository<Article>
  ) { }


  async create(course: CreateArticleDto) {
    return await this.articleRepository.save(course)
  }

  async findAll({ pageSize, page }: PaginationParams2Dto): Promise<{ data: Article[], count: number }> {

    const [data, count] = await this.articleRepository.findAndCount({
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
    return await this.articleRepository.findOneBy(id)


  }

  async update(id: string, course: UpdateArticleDto) {
    // 去除时间戳和id
    ['_id', 'createdAt', 'updatedAt'].forEach(
      k => delete course[k]
    )

    return await this.articleRepository.update(id, course)
  }

  async remove(id: string): Promise<any> {
    // const r = await this.courseRepository.findOneBy(_id)
    // return await this.courseRepository.remove(r)
    return await this.articleRepository.delete(id)
  }
}
