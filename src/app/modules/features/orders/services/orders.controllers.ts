import pool from '../../../../../db/pool.js';
import { Request, Response, NextFunction } from 'express';

export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const query = 'SELECT * FROM orders';
    const { rows } = await pool.query(query);
    rows.length === 0
      ? res.status(404).json({ message: 'No orders found' })
      : res.json(rows);
  } catch (error) {
    next(error);
  }
};

export const getOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const query = 'SELECT * FROM orders WHERE order_id = $1';
    const { rows } = await pool.query(query, [id]);
    rows.length === 0
      ? res.status(404).json({ message: 'Order not found' })
      : res.json(rows);
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { user_id, product_id, total, address } = req.body;
  if (!user_id || !product_id || !total || !address) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }
  try {
    const query =
      'INSERT INTO orders (user_id, product_id, total, address) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [user_id, product_id, total, address];
    const { rows } = await pool.query(query, values);
    res.json(rows);
  } catch (error) {
    next(error);
  }
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
