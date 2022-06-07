import { CacheModule, Global, Module } from '@nestjs/common';

import { HttpClient } from '@/modules/common/contracts';
import { AxiosHTTPClient } from '@/modules/common/utils';

@Global()
@Module({
  imports: [CacheModule.register()],
  providers: [
    {
      provide: HttpClient,
      useClass: AxiosHTTPClient,
    },
  ],
  exports: [HttpClient],
})
export class CommonModule {}
