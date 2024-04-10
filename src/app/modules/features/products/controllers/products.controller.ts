import { Router, Request, Response, NextFunction } from 'express';
import {
  getProducts,
  getProduct,
  addProduct,
  addProductImage,
} from '../services/products.service';
import { multerMemoryStorage } from '../../../../middleware/upload';
import { uploadToCloudinary } from '../../../../../utils/cloudinary';
import {
  throwDetailedError,
  createDetailedError,
} from '../../../../../utils/error';
import { STATUS_CODES } from '../../../../../domain/constants';

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
  multerMemoryStorage.single('file'), // Multer will look for a file in the 'file' field of the form data and add it to req.file
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

    let imageUrl: string;
    try {
      imageUrl = await uploadToCloudinary(req.file, 'products');
    } catch (err) {
      return next(
        createDetailedError(
          'Error uploading image to cloudinary',
          STATUS_CODES.INTERNAL_SERVER_ERROR,
        ),
      );
    }

    const newProductData = await addProduct(req.body).catch((err) => next(err));

    await addProductImage(newProductData.id, imageUrl).catch((err) =>
      next(err),
    );

    const newProduct = await getProduct(newProductData.id).catch((err) =>
      next(err),
    );

    return res.status(STATUS_CODES.CREATED).json(newProduct);
  },
);

export default router;
