import { getMandatoryEnvValue } from '@/util';

export default {
  app: {
    name: getMandatoryEnvValue('APP_NAME', 'Ton Count'),
    port: getMandatoryEnvValue('APP_PORT', 3000),
    timeout: getMandatoryEnvValue('TIMEOUT', 5000) as number,
  },
  security: {
    saltRounds: getMandatoryEnvValue('SALT_ROUNDS', 10),
    constant: 'ton-test-aplication',
  },
  provider: {
    countapi: 'https://api.countapi.xyz/hit',
  },
};
