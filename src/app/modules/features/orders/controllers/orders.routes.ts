import { Router } from 'express';
import { getOrders, getOrder, createOrder, updateOrder, deleteOrder } from '../services/orders.controllers';
import { errorHandler } from '../../middleware/errorHandler';
const router = Router();

router.get('/', getOrders, errorHandler);
router.get('/:id', getOrder, errorHandler);
router.post('/', createOrder, errorHandler);
router.put('/:id', updateOrder, errorHandler); // not sure if the user should be able to update an order
router.delete('/:id', deleteOrder, errorHandler);

export default router;