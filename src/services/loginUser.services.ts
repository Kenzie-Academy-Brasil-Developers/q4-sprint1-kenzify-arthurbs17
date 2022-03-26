import { Request } from 'express';
import JWT from 'jsonwebtoken';
import { config, USERS_DB } from '../configs';
import bcrypt from 'bcryptjs';

const loginUser = async (req: Request) => {
  const { username, password } = req.body;

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
