import pool from '../../../../../db/pool.js';
import { Request, Response } from 'express';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const query = 'SELECT * FROM products';
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const query = 'SELECT * FROM products WHERE product_id = $1';
    const { rows } = await pool.query(query, [id]);
    res.json(rows);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};
