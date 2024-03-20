import { Router, Request, Response } from 'express';
import { register, login } from '../services/auth.service';
import { STATUS_CODES } from '../../../../../domain/constants';
import { throwDetailedError } from '../../../../../utils/error';

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
  async (req: Request<object, object, ReqRegisterBody>, res: Response) => {
    if (!req.body || !req.body.name || !req.body.email || !req.body.password)
      return throwDetailedError(
        'Name, email, and password are required',
        STATUS_CODES.BAD_REQUEST,
      );

    await register(req.body);

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
