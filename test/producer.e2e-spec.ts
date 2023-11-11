import * as request from 'supertest';
import { Test } from '@nestjs/testing';

import { INestApplication } from '@nestjs/common';
import { ProducerModule } from '../src/producer/producer.module';
import { ProducerService } from '../src/producer/producer.service';
import { AppModule } from '../src/app.module';

describe('Producers', () => {
  const jwtToken = 'your_jwt_token';
  let app: INestApplication;
  const producerService = {
    findAll: () => [
      {
        name: 'Producer one',
        id: 1,
        created_at: new Date(),
        deleted_at: null,
      },
    ],
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ProducerService)
      .useValue(producerService)
      .compile();

    app = moduleRef.createNestApplication();

    await app.init();
  });

  // beforeEach(async()=>{
  //     const loginRes = await request(app.getHttpServer())
  //     .post('/login')
  //     .send({
  //         email: "kathepachecobaca@gmail.com",
  //         password: "12345678"
  //     })
  //     });
  // })
  // it(`/GET producers`, () => {
  //     return request(app.getHttpServer())
  //         .get('/producers')
  //         .expect(200)
  //         .expect({
  //             data: producerService.findAll(),
  //         });
  // });

  it(`/POST should create a producer`, () => {
    const body = {
      name: 'Producer Test',
    };
    return request(app.getHttpServer())
      .post('/producers')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(body)
      .expect(201);
  });
});
