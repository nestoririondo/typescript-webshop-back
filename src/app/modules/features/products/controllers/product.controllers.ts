import { Router } from 'express';
import { getProducts, getProduct, postProduct } from '../services/product.services';
import { errorHandler } from '../../middleware/errorHandler';

const router = Router();

router.get('/', getProducts, errorHandler);
router.get('/:id', getProduct, errorHandler);
router.post('/', postProduct, errorHandler);

export default router;