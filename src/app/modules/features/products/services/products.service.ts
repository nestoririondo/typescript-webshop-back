import pool from '../../../../../db/pool.js';
import { throwDetailedError } from '../../../../../utils/error.js';
import { STATUS_CODES } from '../../../../../domain/constants.js';
import { v4 as uuidv4 } from 'uuid';

export type Product = {
  id?: typeof uuidv4;
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

export const addProduct = async (product: Product) => {
  const { name, description, price, stock } = product;
  const { rows } = await pool.query(
    `INSERT INTO products (name, description, price, stock) VALUES ($1, $2, $3, $4) RETURNING *`,
    [name, description, price, stock],
  );
  return rows[0];
};

export const addProductImage = async (product_id: string, url: string) => {
  const { rows } = await pool.query(
    `INSERT INTO images (product_id, url) VALUES ($1, $2) RETURNING *`,
    [product_id, url],
  );
  return rows[0];
}