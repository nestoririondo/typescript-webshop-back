import pool from '../../../../../db/pool.js';
import { throwDetailedError } from '../../../../../utils/error.js';
import { STATUS_CODES } from '../../../../../domain/constants.js';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
};

export const getProducts = async () => {
  const { rows } = await pool.query('SELECT * FROM Products');
  return rows;
};

export const getProduct = async (id: string) => {
  const { rows } = await pool.query('SELECT * FROM Products WHERE id = $1', [
    id,
  ]);
  if (rows.length === 0) {
    throwDetailedError('Product not found', STATUS_CODES.NOT_FOUND);
  }
  return rows[0];
};
