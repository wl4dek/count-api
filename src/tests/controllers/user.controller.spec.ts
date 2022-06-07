import { Test } from '@nestjs/testing';
import { UserController } from '@/modules/user/user.controller';
import { UserService } from '@/modules/user/service';
import { UserRepository } from '@/domain/repository';
import { UserPostgresRepository } from '@/modules/user/repository';
import { User } from '@/domain/entity';
import { Request } from 'express';
import { dbClient } from '@/infra/database';
import { NotFoundException } from '@nestjs/common';

describe('UserController', () => {
  let controller: UserController;
  let user: User;
  let request: Request;

  const userNew = {
    email: 'userNew@email.com',
    name: 'user New',
    password: 'userPassNew',
  };

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
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: UserRepository,
          useClass: UserPostgresRepository,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('shold be defined', () => {
    expect(controller).toBeDefined();
  });

  it('shold not found when passed userId not exist', async () => {
    const requestUserNotExist = {
      user: {
        userId: '213sadsa',
        name: 'NotExist',
      },
    } as unknown as Request;

    try {
      await controller.getUser(requestUserNotExist);
    } catch (e: any) {
      expect(e).toBeInstanceOf(NotFoundException);
      expect(e.message).toBe('User not found');
    }
  });

  it('shold be create user', async () => {
    expect(await controller.createUser(userNew)).toMatchObject(userNew);
  });

  it('shold found when passed userId exist', async () => {
    expect(await controller.getUser(request)).toEqual({
      ...user,
    });
  });
});
