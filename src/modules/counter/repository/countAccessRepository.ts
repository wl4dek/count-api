import { CountAccessNumberRepository, ResponseCountApi } from '@/domain/repository';
import axios from 'axios';
import env from '@/config/env';

const { provider } = env;

export class CountAccessMemoryRepository implements CountAccessNumberRepository {
  private count = { value: 0 };

  async incrementAccessNumber(): Promise<void> {
    const { data } = await axios.get(`${provider.countapi}/teste/user`);
    this.count = data;
    console.log(data);
  }
  async getAccessNumber(): Promise<ResponseCountApi> {
    return this.count;
  }
}
