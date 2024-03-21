import {
  throwDatabaseError,
  throwDetailedError,
} from '../../../../../utils/error';
import pool from '../../../../../db/pool';
import { ReqLoginBody, ReqRegisterBody } from '../controllers/auth.controller';
import { STATUS_CODES } from '../../../../../domain/constants';
import bcrypt from 'bcrypt';

export const register = async (data: ReqRegisterBody) => {
  const { rows } = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    data.email,
  ]);

  if (rows.length > 0)
    throwDetailedError('User already exists', STATUS_CODES.CONFLICT);

  const { name, email, password, profilePic } = data;

  const hashedPassword = await bcrypt
    .genSalt(10)
    .then((salt) => {
      return bcrypt.hash(password, salt);
    })
    .catch((err) => {
      throwDetailedError(
        'Error hashing password',
        STATUS_CODES.INTERNAL_SERVER_ERROR,
      );
    });

  const client = await pool.connect();

  let createdUserResponse;
  try {
    createdUserResponse = await client.query(
      `INSERT INTO users (name, email, password, profile_pic) VALUES ($1, $2, $3, $4) RETURNING *`,
      // @ts-ignore
      [name, email, hashedPassword, profilePic],
    );
  } catch (error) {
    throwDatabaseError('Error creating user');
  } finally {
    client.release();
  }

  return createdUserResponse?.rows;
};

export const login = async (data: ReqLoginBody) => {
  const { rows } = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    data.email,
  ]);

  if (!rows?.length)
    throwDetailedError(
      'Email or password is not correct, user not found',
      STATUS_CODES.NOT_FOUND,
    );

  const user = rows[0];

  const isPasswordValid = await bcrypt.compare(data.password, user.password);

  if (!isPasswordValid)
    throwDetailedError(
      'Email or password is not correct, password mismatch',
      STATUS_CODES.UNAUTHORIZED,
    );

  return user;
};
