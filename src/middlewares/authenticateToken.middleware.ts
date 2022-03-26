import { NextFunction, Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { config, USERS_DB } from '../configs';
import { User } from '../models';

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers['authorization'];

  if (!authorizationHeader) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'missing header authorization.' });
  }

  const token = authorizationHeader.split(' ')[1];

  JWT.verify(token, config.secretKey, (err, decode: any) => {
    if (err) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: 'wrong crendentials' });
    }
    req.user = USERS_DB.find((userDB) => userDB.username === decode.username);
    return next();
  });
};

export default authenticateToken;
