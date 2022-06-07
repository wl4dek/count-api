import { Test } from '@nestjs/testing';
import { CountAccessNumberRepository } from '@/domain/repository';
import { CounterController } from '@/modules/counter/counter.controller';
import { CountAccessPostgresRepository } from '@/modules/counter/repository';
import { Request } from 'express';
import faker from '@faker-js/faker';
import axios from 'axios';
import { dbClient } from '@/infra/database';
import { User } from '@/domain/entity';

describe('CounterController', () => {
  let controller: CounterController;
  let repository: CountAccessNumberRepository;
  let user: User;
  let request: Request;

  beforeAll(async () => {
    user = await dbClient.user.create({
      data: {
        email: 'user@email.com',
        name: 'user',
        password: 'userPass',
      },
    });

    request = {
      user: {
        userId: user.id,
        name: user.name,
      },
    } as unknown as Request;
  });

  afterAll(async () => {
    await dbClient.user.deleteMany();
  });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CounterController],
      providers: [
        {
          provide: CountAccessNumberRepository,
          useClass: CountAccessPostgresRepository,
        },
      ],
    }).compile();

    repository = module.get<CountAccessNumberRepository>(CountAccessNumberRepository);
    controller = module.get<CounterController>(CounterController);
  });

  it('shold be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('shold return number of access', () => {
    it('when the first access of user', async () => {
      expect(await controller.getCount(request)).toEqual({
        value: 0,
      });
    });

    it('when the `n` access of user', async () => {
      const numberAccess = Number(faker.random.numeric());
      jest.spyOn(repository, 'getAccessNumber').mockResolvedValue({ value: numberAccess });

      expect(await controller.getCount(request)).toEqual({
        value: numberAccess,
      });
    });
  });

  describe('shold increment number of access', () => {
    it('when the first access of user', async () => {
      const numberAccess = 0;

      expect(await controller.getCount(request)).toEqual({
        value: numberAccess,
      });

      jest.spyOn(axios, 'get').mockResolvedValue({ data: { value: numberAccess + 1 } });
      await controller.incrementCount(request);

      expect(await controller.getCount(request)).toEqual({
        value: 1,
      });
    });
  });
});
