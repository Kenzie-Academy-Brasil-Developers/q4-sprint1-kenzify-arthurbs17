import { Request, Response } from 'express';
import { USERS_DB } from '../configs';
import { User } from '../models';
import {
  createUser,
  loginUser,
  songInPlaylist,
  addCountListenSong,
  deleteSongForPlaylist,
  getAllUsers,
} from '../services';
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
  const { artist, song } = req.query;

  if (!artist && !song) {
    const response = await songInPlaylist(req);
    return res.status(StatusCodes.OK).json(response);
  }

  const songInDB = await addCountListenSong(req, res);
  if (songInDB) {
    return res.status(StatusCodes.OK).json(songInDB);
  }
};

export const deleteSongForPlaylistController = (
  req: Request,
  res: Response
) => {
  const response: any = deleteSongForPlaylist(req, res);
  if (response) {
    if (response.message === 'deleted') {
      return res.status(StatusCodes.NO_CONTENT).json({});
    }
    return response;
  }
};

export const getAllUsersController = async (req: Request, res: Response) => {
  const response = await getAllUsers(USERS_DB);
  return res.status(StatusCodes.OK).json(response);
};
