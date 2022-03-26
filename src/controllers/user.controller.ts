import { Request, Response } from 'express';
import { USERS_DB } from '../configs';
import { User } from '../models';
import { createUser, loginUser, songInPlaylist } from '../services';
import { StatusCodes } from 'http-status-codes';

export const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userReq: User = req.validate;
  const newUser = await createUser(userReq);

  USERS_DB.push(newUser);

  const { password, ...response } = newUser;

  return res.status(StatusCodes.CREATED).json(response);
};

export const loginUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = req.validate;
  const userDB = await loginUser(user);

  if (userDB.message) {
    return res.status(StatusCodes.UNAUTHORIZED).json(userDB);
  }

  return res.status(StatusCodes.OK).json(userDB);
};

export const addSongInPlaylist = async (req: Request, res: Response) => {
  const response = await songInPlaylist(req);
  return res.status(StatusCodes.OK).json(response);
};
