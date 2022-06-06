import { getMandatoryEnvValue } from '@/util';

export default {
  app: {
    name: getMandatoryEnvValue('APP_NAME', 'Ton Count Access'),
    port: getMandatoryEnvValue('APP_PORT', 3000),
  },
  provider: {
    countapi: 'https://api.countapi.test.xyz/hit',
  },
};
