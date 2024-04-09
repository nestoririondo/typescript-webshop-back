import { Router, Request, Response, NextFunction } from 'express';
import { register, login } from '../services/auth.service';
import { STATUS_CODES } from '../../../../../domain/constants';
import {
  createDetailedError,
  throwDetailedError,
} from '../../../../../utils/error';

export type ReqRegisterBody = {
  name: string;
  email: string;
  password: string;
  profilePic?: string;
};

export type ReqLoginBody = {
  email: string;
  password: string;
};

const router = Router();

router.post(
  '/register',
  async (
    req: Request<object, object, ReqRegisterBody>, // body is actually the third object inside Request (ctrl click), abstract type
    res: Response,
    next: NextFunction,
  ) => {
    if (!req.body || !req.body.name || !req.body.email || !req.body.password)
      return next(
        createDetailedError(
          'Name, email, and password are required',
          STATUS_CODES.BAD_REQUEST,
        ),
      );

    await register(req.body).catch((err) => next(err)); // if register throws error, it will go to the next

    return res.status(STATUS_CODES.CREATED).json({
      message: 'User registered successfully',
    });
  },
);

// Define your routes here
router.post(
  '/login',
  async (req: Request<object, object, ReqLoginBody>, res) => {
    if (!req.body || !req.body.email || !req.body.password)
      return throwDetailedError(
        'Email and password are required',
        STATUS_CODES.BAD_REQUEST,
      );

    const user = await login(req.body);

    const safeUser = Object.assign({
      ...user,
      password: undefined,
      createdAt: user.created_at,
      profilePic: user.profile_pic,
    });

    return res.status(STATUS_CODES.OK).json(safeUser);
  },
);

// Export the router
export default router;
