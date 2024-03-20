import express from 'express';
import authRoutes from './app/modules/features/auth/controllers/auth.controller';
import errorHandler from './app/middleware/errorHandler';
import orderRoutes from './app/modules/features/orders/controllers/orders.controller';
import productRoutes from './app/modules/features/products/controllers/products.controller';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get('/', (_, res) => {
  res.send('Hello World!');
});

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
