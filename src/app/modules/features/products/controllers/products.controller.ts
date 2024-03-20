import { Router, Request, Response, NextFunction } from 'express';
import { getProducts, getProduct } from '../services/products.service';
import { STATUS_CODES } from '../../../../../domain/constants';
import { throwDetailedError } from '../../../../../utils/error';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const rows = await getProducts().catch((err) => next(err));
  return res.status(STATUS_CODES.OK).json({ data: rows });
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!id)
    return throwDetailedError('Id is required', STATUS_CODES.BAD_REQUEST);
  const rows = await getProduct(id).catch((err) => next(err));
  return res.status(STATUS_CODES.OK).json({ data: rows });
});

export default router;
