import { getMandatoryEnvValue } from '@/util';

export default {
  app: {
    name: getMandatoryEnvValue('APP_NAME', 'Ton Count Access'),
    port: getMandatoryEnvValue('APP_PORT', 3000),
    timeout: getMandatoryEnvValue('TIMEOUT', 5000) as number,
  },
  security: {
    saltRounds: getMandatoryEnvValue('SALT_ROUNDS', 10),
    constant: 'tdd-ton-test-aplication',
  },
  provider: {
    countapi: 'https://api.countapi.test.xyz/hit',
  },
};

process.env.DATABASE_URL = 'postgresql://ton_wladek:approved_by_ton@localhost:5432/ton_db_test?schema=public';
