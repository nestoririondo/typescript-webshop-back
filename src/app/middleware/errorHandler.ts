import { DetailedError } from '../../utils/error';
import { NextFunction, Request, Response } from 'express';

const errorHandler = (
  err: DetailedError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(err.code ?? 500).json({
    message: err.message,
  });

  next();
};

export default errorHandler;
