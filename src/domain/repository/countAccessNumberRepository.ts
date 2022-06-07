export abstract class CountAccessNumberRepository {
  abstract incrementAccessNumber(userId: string): Promise<ResponseCountApi>;
  abstract getAccessNumber(userId: string): Promise<ResponseCountApi>;
}

export interface ResponseCountApi {
  value: number;
}
