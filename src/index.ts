import express from 'express';
import authRoutes from './app/modules/features/auth/routes/auth.routes';
import productRoutes from './app/modules/features/products/controllers/product.routes';
import orderRoutes from './app/modules/features/orders/controllers/orders.routes';

const app = express();
const port = 3000;

app.get('/', (_, res) => {
  res.send('Hello World!');
});

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
