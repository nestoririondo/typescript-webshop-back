import { Router } from 'express';
import { getProducts, getProduct } from '../services/products.controllers';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProduct);

export default router;