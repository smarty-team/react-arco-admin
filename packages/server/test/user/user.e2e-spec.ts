import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from '../../src/user/user.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(200)
      .expect({ "data": [{ "_id": "637a2d819d3664ae9eb1ebda", "createdAt": "2022-11-20T13:37:05.967Z", "updatedAt": "2022-11-20T13:37:05.967Z", "name": "然叔", "avatar": "cookieboty", "email": "15906475@qq.com", "phoneNumber": "13611177421", "password": "jjnh4vk19A+N6rzvTBdkEw==", "role": "637855e9e8c408970ef9f4de", "job": "frontend", "jobName": "前端开发工程师", "organization": "cookieboty", "location": "beijing", "personalWebsite": "cookieboty", "salt": "q4mF" }], "meta": { "total": 1 } });

  });
});
