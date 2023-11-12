import * as request from 'supertest';
import { Test } from '@nestjs/testing';

import { INestApplication } from '@nestjs/common';
import { ProducerModule } from '../src/producer/producer.module';
import { ProducerService } from '../src/producer/producer.service';
import { AppModule } from '../src/app.module';

describe('Producers', () => {
  let jwtToken = '';
  let app: INestApplication;
  const mockProducerService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const temporaryProducers = [
    { name: 'Producer One' },
    { name: 'Producer Two' },
  ];

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ProducerService)
      .useValue(mockProducerService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'kathepachecobaca33@gmail.com', password: '12345678' })
      .expect(200);
    jwtToken = loginResponse.body.token;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('/POST should create a producer', () => {
    it(`should be ok`, async () => {
      const body = {
        name: 'Producer Test',
      };

      const response = await request(app.getHttpServer())
        .post('/producers')
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(body);

      if (response.body.role === 'admin') {
        expect(response.status).toBe(201);
        expect(response.body.length).toBe(1);
      } else {
        expect(response.status).toBe(403);
      }
    });
  });

  describe('/GET should return all the producers', () => {
    beforeEach(() => {
      jest
        .spyOn(mockProducerService, 'findAll')
        .mockResolvedValueOnce(temporaryProducers);
    });

    it('should return OK', async () => {
      const response = await request(app.getHttpServer())
        .get('/producers')
        .set('Authorization', `Bearer ${jwtToken}`);
      expect(response.body.length).toEqual(2);
      expect(response.status).toBe(200);
    });
  });

  describe('/GET/:id should return a producer by ID', () => {
    const producerId = 2;
    const mockProducer = {
      id: producerId,
      name: 'Temporary Producer Two',
    };

    beforeEach(() => {
      jest
        .spyOn(mockProducerService, 'findOne')
        .mockResolvedValueOnce(mockProducer);
    });

    it('should return OK', async () => {
      const response = await request(app.getHttpServer())
        .get(`/producers/${producerId}`)
        .set('Authorization', `Bearer ${jwtToken}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(producerId);
      expect(response.body.name).toBe('Temporary Producer Two');
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
