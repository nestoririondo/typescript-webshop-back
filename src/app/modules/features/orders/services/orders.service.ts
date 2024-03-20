import pool from '../../../../../db/pool.js';
import { ReqOrderBody } from '../controllers/orders.controller';
import { throwDetailedError } from '../../../../../utils/error';
import { STATUS_CODES } from '../../../../../domain/constants';
import { v4 as uuidv4 } from 'uuid';

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

export const createOrder = async (data: ReqOrderBody) => {
  const { user_id, address } = data;
  const id = uuidv4();
  const date = new Date();
  const status = 'pending';
  const { rows } = await pool.query<any>(
    'INSERT INTO orders (id, user_id, address, date, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [id, user_id, address, date, status],
  );
  return rows;
};
