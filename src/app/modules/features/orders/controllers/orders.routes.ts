import { Router } from 'express';
import { getOrders, getOrder, createOrder, updateOrder, deleteOrder } from '../services/orders.controllers';

const router = Router();

router.get('/', getOrders);
router.get('/:id', getOrder);
router.post('/', createOrder);
router.put('/:id', updateOrder); // not sure if the user should be able to update an order
router.delete('/:id', deleteOrder);

export default router;