import axios, { AxiosError } from 'axios';

import { HttpClient, HttpRequest, HttpResponse } from '@/modules/common/contracts';
import { HttpException } from '@nestjs/common';

export class AxiosHTTPClient implements HttpClient {
  async request<TData = any>(request: HttpRequest<any>): Promise<HttpResponse<TData>> {
    try {
      const { url, method, data, headers, params } = request;

      const { data: response, status } = await axios.request<TData>({
        url,
        method,
        data,
        headers,
        params,
      });

      return {
        data: response,
        statusCode: status,
      };
    } catch (error) {
      const responseError = error as AxiosError;
      if (responseError.isAxiosError) {
        const { response } = responseError;
        const responseData = !!response?.data ? response.data : { message: responseError.message };
        throw new HttpException({ ...responseData }, response?.status || 500);
      }

      throw error;
    }
  }
}
