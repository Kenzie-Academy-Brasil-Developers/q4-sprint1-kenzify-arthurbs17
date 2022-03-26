import { USERS_DB } from '../configs';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const verifyExistsUsername = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.validate;

  const user = USERS_DB.find(
    (userDB) => userDB.username.toLowerCase() === username.toLowerCase()
  );

  if (user) {
    return res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ message: 'You can not use this username.' });
  }

  return next();
};

export default verifyExistsUsername;
