import { NextFunction, Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { config } from '../configs';
import { User } from '../models';

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: 'wrong credentials' });
    }

    const [tokenType, token] = authorizationHeader.split(' ');

    if (tokenType !== 'Bearer' || !token) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: 'wrong credentials' });
    }

    try {
      const tokenPayload = JWT.verify(token, config.secretKey);

      if (typeof tokenPayload !== 'object' || !tokenPayload.sub) {
        return res
          .status(StatusCodes.FORBIDDEN)
          .json({ message: 'wrong token' });
      }

      const user: User = {
        uuid: tokenPayload.sub,
        username: tokenPayload.username,
        password: tokenPayload.password,
        playlist: tokenPayload.playlist,
      };

      req.user = user;

      return next();
    } catch (error) {
      return res.status(StatusCodes.FORBIDDEN).json({ message: 'wrong token' });
    }
  } catch (error) {
    return next(error);
  }
};

export default authenticateToken;
