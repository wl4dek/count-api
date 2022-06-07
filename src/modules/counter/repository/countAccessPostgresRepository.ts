import { CountAccessNumberRepository, ResponseCountApi } from '@/domain/repository';
import axios from 'axios';
import env from '@/config/env';
import { dbClient } from '@/infra/database';
import { Inject } from '@nestjs/common';
import { HttpClient, HttpMethod } from '@/modules/common/contracts';

const { provider } = env;

export class CountAccessPostgresRepository implements CountAccessNumberRepository {
  constructor(
    @Inject(HttpClient)
    private readonly httpClient: HttpClient,
  ) {}

  async incrementAccessNumber(userId: string): Promise<ResponseCountApi> {
    const { data } = await this.httpClient.request({
      url: `${provider.countapi}/t/${userId}`,
      method: HttpMethod.GET,
    });

    const counter = await dbClient.counter.findUnique({
      where: {
        userId,
      },
    });

    if (!counter) {
      await dbClient.counter.create({
        data: { userId, count: data.value },
      });
    }

    await dbClient.counter.update({
      where: {
        userId,
      },
      data: {
        count: data.value,
      },
    });

    return { value: data.value };
  }

  async getAccessNumber(userId: string): Promise<ResponseCountApi> {
    const counter = await dbClient.counter.findUnique({
      where: {
        userId,
      },
    });

    return { value: counter?.count || 0 };
  }
}
