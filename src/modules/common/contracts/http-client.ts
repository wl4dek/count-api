export type HttpResponse<T = Record<string, unknown>> = {
  statusCode: number;
  data: T;
};

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export interface HttpRequest<T = any> {
  url: string;
  method: HttpMethod;
  data?: T;
  headers?: Record<string, string>;
  params?: Record<string, string>;
}

export abstract class HttpClient {
  abstract request<TData = any>(request: HttpRequest<any>): Promise<HttpResponse<TData>>;
}
