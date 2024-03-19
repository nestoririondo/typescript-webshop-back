import pool from '../../../../../db/pool.js';
import { Request, Response, NextFunction } from 'express';

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const query = 'SELECT * FROM Products';
    const { rows } = await pool.query(query);
    rows.length === 0
      ? res.status(404).json({ message: 'No products found' })
      : res.json(rows);
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  console.log(id)
  try {
    const query = 'SELECT * FROM Products WHERE id = $1';
    const { rows } = await pool.query(query, [id]);
    rows.length === 0
      ? res.status(404).json({ message: 'Product not found' })
      : res.json(rows[0]);
  } catch (error) {
    next(error);
  }
};

export const postProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, description, price } = req.body; // image to be added later with multer middleware
  try {
    const query =
      'INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *';
    const values = [name, description, price];
    const { rows } = await pool.query(query, values);
    res.json(rows);
  } catch (error) {
    next(error);
  }
};
