import { Request } from 'express';
import JWT from 'jsonwebtoken';
import { config, USERS_DB } from '../configs';
import bcrypt from 'bcryptjs';
import { User } from '../models';

const loginUser = async ({ username, password }: User) => {
  const user = USERS_DB.find((userDB) => userDB.username === username);

  if (user) {
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return { message: 'wrong credentials!' };
    }

    const token = JWT.sign(user, config.secretKey, {
      expiresIn: config.expiresIn,
    });

    return { acessToken: token };
  }

  return { message: 'wrong credentials!' };
};

export default loginUser;
