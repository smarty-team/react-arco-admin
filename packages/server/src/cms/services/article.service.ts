import { Injectable, Inject } from '@nestjs/common';
import { In, Like, Raw, MongoRepository, ObjectID } from 'typeorm';
import { Article } from '../entities/article.mongo.entity'
import { PaginationParams2Dto } from '../../shared/dtos/pagination-params.dto'
import { CreateArticleDto, UpdateArticleDto } from '../dtos/article.dto';
import axios from 'axios'
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ArticleService {
  constructor(
    @Inject('ARTICLE_REPOSITORY')
    private articleRepository: MongoRepository<Article>,

    private readonly configService: ConfigService
  ) { }


  async create(course: CreateArticleDto) {
    const ret = await this.articleRepository.save(course)
    // await this.sync('' + ret._id)
    return ret
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
    return await this.articleRepository.findOneBy(id)
  }

  async update(id: string, course: UpdateArticleDto) {
    // 去除时间戳和id
    ['_id', 'createdAt', 'updatedAt'].forEach(
      k => delete course[k]
    )
    const ret = await this.articleRepository.update(id, course)

    // TODO 暂时使用同步刷新
    await this.sync(id)
    return ret
  }
  /**
   * 同步文章
   * @param id 
   */
  async sync(id: string) {

    const secret = this.configService.get<String>('cms.validateToken')
    // const host = 'http://localhost:3001'
    const host = this.configService.get<String>('cms.host')
    const url = `api/revalidate?secret=${secret}&id=${id}`
    console.log('sync nest validate url:', host + '/' + url)
    try {
      console.log('url', url)
      await axios.get(host + '/' + url)
    } catch (error) {
      // console.log(error)
      console.log('同步失败')
      throw error
    }

    return
  }


  async remove(id: string): Promise<any> {
    return await this.articleRepository.delete(id)
  }
}
