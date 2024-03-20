import pool from '../../../../../db/pool.js';
import { Request, Response, NextFunction } from 'express';
import { ReqOrderBody } from '../controllers/orders.controller';

export const getOrders = async () => {
  const { rows } = await pool.query('SELECT * FROM orders');
  return rows;
};

export const getOrder = async (id: string) => {
  const { rows } = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
  return rows;
};

export const createOrder = async (data: ReqOrderBody) => {
  const { user_id, address } = data;
  const { rows } = await pool.query(
    'INSERT INTO orders (id, user_id, address) VALUES ($1, $2, $3) RETURNING *',
    [user_id, address],
  );
  return rows;
};

export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const { user_id, product_id, total, address } = req.body;
  try {
    const query =
      'UPDATE orders SET user_id = $1, product_id = $2, total = $3, address = $4 WHERE order_id = $5 RETURNING *';
    const values = [user_id, product_id, total, address, id];
    const { rows } = await pool.query(query, values);
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const query = 'DELETE FROM orders WHERE order_id = $1 RETURNING *';
    const { rows } = await pool.query(query, [id]);
    rows.length === 0
      ? res.status(404).json({ message: 'Order not found' })
      : res.json(rows);
  } catch (error) {
    next(error);
  }
};
