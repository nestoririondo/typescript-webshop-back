import pool from '../../../../../db/pool.js';
import { throwDetailedError } from '../../../../../utils/error';
import { STATUS_CODES } from '../../../../../domain/constants';

export const getProducts = async () => {
  try {
    const { rows } = await pool.query('SELECT * FROM Products');
    return rows;
  } catch (err) {
    throwDetailedError(
      'Error fetching products',
      STATUS_CODES.INTERNAL_SERVER_ERROR,
    );
  }
};

export const getProduct = async (id: string) => {
  try {
    const { rows } = await pool.query('SELECT * FROM Products WHERE id = $1', [id]);
    if (rows.length === 0) {
      throwDetailedError('Product not found', STATUS_CODES.NOT_FOUND);
    }
    return rows[0];
  } catch (err) {
    throwDetailedError(
      'Error fetching product',
      STATUS_CODES.INTERNAL_SERVER_ERROR,
    );
  }
};
