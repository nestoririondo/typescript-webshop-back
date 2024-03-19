import express from 'express';
import cors from 'cors';
import authRoutes from './app/modules/features/auth/routes/auth.routes';
import productRoutes from './app/modules/features/products/controllers/product.controllers';
import orderRoutes from './app/modules/features/orders/controllers/orders.controllers';
import 'dotenv/config';

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
