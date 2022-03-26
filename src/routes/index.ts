import { Router } from 'express';
import {
  validateShape,
  authenticateToken,
  verifyExistsUsername,
} from '../middlewares';
import { userShape, loginShape, songShape } from '../shapes';
import {
  createUserController,
  loginUserController,
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

export default router;
