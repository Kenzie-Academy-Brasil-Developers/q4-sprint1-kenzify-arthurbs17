import dotenv from 'dotenv';

dotenv.config();

type DotEnvConfigs = {
  secretKey: string;
  expiresIn: string;
};

const config: DotEnvConfigs = {
  secretKey: process.env.SECRET_KEY,
  expiresIn: process.env.EXPIRES_IN ?? '1h',
};

type Users = {
  username: string;
  id: string;
  playlist: object;
};

const USERS_DB: Array<Users> = [];

export { USERS_DB, config };
