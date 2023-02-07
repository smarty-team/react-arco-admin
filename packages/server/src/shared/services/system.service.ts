import { Injectable, Inject } from '@nestjs/common';
import { Dictionary } from '../entities/dictionary.mongo.entity'
import { MongoRepository } from 'typeorm';
import { UpdateDictionaryDto } from '../dtos/dictionary.dto';
@Injectable()
export class SystemService {
  constructor(
    @Inject('DICTIONARY_REPOSITORY')
    private DictionaryRepository: MongoRepository<Dictionary>
  ) { }



  async find(): Promise<{ data: object }> {

    const data = await this.DictionaryRepository.findOneBy({})

    data && delete data._id
    return {
      data: data ? data : { menus: {} }
    }
  }


  async update(data: UpdateDictionaryDto) {
    console.log('data', data)
    // 去除时间戳和id
    // ['_id', 'createdAt', 'updatedAt'].forEach(
    //   k => delete data[k]
    // )
    return await this.DictionaryRepository.updateOne({}, { $set: data }, { upsert: true })
  }


}
