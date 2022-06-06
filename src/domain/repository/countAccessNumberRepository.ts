export abstract class CountAccessNumberRepository {
  abstract incrementAccessNumber(): Promise<void>;
  abstract getAccessNumber(): Promise<ResponseCountApi>;
}

export interface ResponseCountApi {
  value: number;
}
