import pool from '../../../../../db/pool.js';
import { throwDetailedError } from '../../../../../utils/error.js';
import { STATUS_CODES } from '../../../../../domain/constants.js';
import { v4 as uuidv4 } from 'uuid';

export type Product = {
  id: typeof uuidv4;
  name: string;
  description: string;
  price: number;
  stock: number;
};

export const getProducts = async () => {
  const { rows } = await pool.query(
    `SELECT products.*, array_agg(images.url) as images
    FROM products
    JOIN images  
    ON products.id = images.product_id
    GROUP BY products.id`,
  );

  return rows;
};

export const getProduct = async (id: string) => {
  const { rows } = await pool.query(
    `SELECT products.*, array_agg(images.url) as images
    FROM products
    JOIN images  
    ON products.id = images.product_id
    WHERE products.id = $1
    GROUP BY products.id`,
    [id],
  );
  if (rows.length === 0) {
    throwDetailedError('Product not found', STATUS_CODES.NOT_FOUND);
  }
  return rows[0];
};
