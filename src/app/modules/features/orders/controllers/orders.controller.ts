import { Router, Request, Response, NextFunction } from 'express';
import { getOrders, getOrder, createOrder } from '../services/orders.service';
import { STATUS_CODES } from '../../../../../domain/constants';
import {
  throwDetailedError,
  createDetailedError,
} from '../../../../../utils/error';
import { v4 as uuidv4 } from 'uuid';

export type ReqOrderBody = {
  userId: typeof uuidv4;
  addressId: typeof uuidv4;
  products: OrderItem[];
};

type OrderItem = {
  id: typeof uuidv4;
  quantity: number;
  price: number;
};

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const rows = await getOrders().catch((err) => next(err));
  return res.status(STATUS_CODES.OK).json({ data: rows });
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!id)
    return throwDetailedError('Order id is required', STATUS_CODES.BAD_REQUEST);
  const order = await getOrder(id).catch((err) => next(err));
  return res.status(STATUS_CODES.OK).json({ data: order });
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const { userId, addressId, products } = req.body;
  if (!userId || !addressId || !products)
    return next(
      createDetailedError(
        'Please fill in all fields',
        STATUS_CODES.BAD_REQUEST,
      ),
    );
  const order = await createOrder(req.body).catch((err) => next(err));
  return res
    .status(STATUS_CODES.CREATED)
    .json({ message: 'Order created successfully', data: order });
});

export default router;
