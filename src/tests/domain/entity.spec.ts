import { User } from '@/domain/entity';
import faker from '@faker-js/faker';

describe('Should be possible to create', () => {
  it('User', () => {
    const name = faker.name.findName();
    const fake_user = {
      name,
      email: `${name}@email.com`,
      password: '123456',
    };
    const user = new User(fake_user);

    expect(user).toEqual({ ...fake_user, id: user.id });
  });
});
