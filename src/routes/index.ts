import { Router } from 'express';
import {
  validateShape,
  authenticateToken,
  verifyExistsUsername,
  validateSongShape,
} from '../middlewares';
import { userShape, loginShape } from '../shapes';
import {
  createUserController,
  loginUserController,
  addSongInPlaylist,
  deleteSongForPlaylistController,
} from '../controllers/user.controller';

const router = Router();

// user routes

router.post(
  '/users/register',
  validateShape(userShape),
  verifyExistsUsername,
  createUserController
);

router.post('/users/login', validateShape(loginShape), loginUserController);

router.put(
  '/users/playlist',
  authenticateToken,
  validateSongShape,
  addSongInPlaylist
);

router.delete(
  '/users/playlist',
  authenticateToken,
  deleteSongForPlaylistController
);

export default router;
