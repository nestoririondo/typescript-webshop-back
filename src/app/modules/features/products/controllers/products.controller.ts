import { Router, Request, Response, NextFunction } from 'express';
import {
  getProducts,
  getProduct,
  addProduct,
  addProductImage,
} from '../services/products.service';
import { upload } from '../../../../middleware/upload';
import { STATUS_CODES } from '../../../../../domain/constants';
import {
  throwDetailedError,
  createDetailedError,
} from '../../../../../utils/error';
import { uploadToCloudinary } from '../../../../middleware/upload';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const rows = await getProducts().catch((err) => next(err));
  return res.status(STATUS_CODES.OK).json(rows);
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!id)
    return throwDetailedError('Id is required', STATUS_CODES.BAD_REQUEST);
  const rows = await getProduct(id).catch((err) => next(err));
  return res.status(STATUS_CODES.OK).json(rows);
});

router.post(
  '/',
  upload.single('file'),
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, description, price, stock } = req.body;
    if (!name || !description || !price || !stock) {
      return next(
        createDetailedError(
          'Please fill in all fields',
          STATUS_CODES.BAD_REQUEST,
        ),
      );
    }

    if (!req.file) {
      return next(
        createDetailedError('No file provided', STATUS_CODES.BAD_REQUEST),
      );
    }

    const imageUrl = await uploadToCloudinary(req.file, 'products');

    const newProductData = await addProduct(req.body).catch((err) => next(err));

    await addProductImage(newProductData.id, imageUrl).catch((err) =>
      next(err),
    );

    const product = await getProduct(newProductData.id).catch((err) => next(err));

    return res.status(STATUS_CODES.CREATED).json(product);
  },
);

export default router;
