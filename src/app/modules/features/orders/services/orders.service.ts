import pool from '../../../../../db/pool.js';
import { ReqOrderBody } from '../controllers/orders.controller';
import { throwDetailedError } from '../../../../../utils/error';
import { STATUS_CODES } from '../../../../../domain/constants';
import { v4 as uuidv4 } from 'uuid';

type Order = {
  id: typeof uuidv4;
  user_id: typeof uuidv4;
  date: string;
  total: number;
  address: typeof uuidv4;
  status: string;
};

export const getOrders = async () => {
  const query = 'SELECT * FROM orders';
  const { rows } = await pool.query(query);
  return rows;
};

export const getOrder = async (id: string) => {
  const { rows } = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
  if (rows.length === 0) {
    throwDetailedError('Order not found', STATUS_CODES.NOT_FOUND);
  }
  return rows[0];
};

export const createOrder = async (data: ReqOrderBody): Promise<Order> => {
  const { userId, addressId, products } = data;
  const total = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0,
  );
  const { rows: orders } = await pool.query<Order>(
    'INSERT INTO orders (user_id, address_id, total) VALUES ($1, $2, $3) RETURNING *',
    [userId, addressId, total],
  );
  let query =
    'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ';
  products.forEach(async (product) => {
    query += `('${orders[0].id}', '${product.id}', ${product.quantity}, ${product.price}),`;
  });
  query = query.slice(0, -1);

  await pool.query(query);
  return orders[0];
};
