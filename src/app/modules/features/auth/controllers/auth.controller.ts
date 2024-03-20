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
    req: Request<object, object, ReqRegisterBody>,
    res: Response,
    next: NextFunction,
  ) => {
    if (!req.body || !req.body.name || !req.body.email || !req.body.password)
      next(
        createDetailedError(
          'Name, email, and password are required',
          STATUS_CODES.BAD_REQUEST,
        ),
      );

    await register(req.body).catch(next);

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

    return res.status(STATUS_CODES.OK).json({
      message: 'User logged in successfully',
      data: user,
    });
  },
);

// Export the router
export default router;
