import { Test } from '@nestjs/testing';
import { AppController } from '@/app.controller';
import { AuthModule } from '@/modules/auth/auth.module';
import { AuthService } from '@/modules/auth/auth.service';

describe('AppController', () => {
  let controller: AppController;

  const mockAuthService = {
    login: jest.fn(() => {
      return {
        access_token: 'jwt_fake_authenticated',
      };
    }),
  };

  jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AuthModule],
      controllers: [AppController],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    controller = module.get<AppController>(AppController);
  });

  it('shold be defined', () => {
    expect(controller).toBeDefined();
  });

  it('shold be return DateTime Now', () => {
    expect(controller.healthCheck()).toEqual({
      timestamp: new Date().toISOString(),
    });
  });

  it('shold be login', async () => {
    const input = {
      email: 'usur.authenticated@email.com',
      password: 'authenticated',
    };

    expect(await controller.login(input)).toEqual({
      access_token: 'jwt_fake_authenticated',
    });

    expect(mockAuthService.login).toHaveBeenCalled();
  });
});
