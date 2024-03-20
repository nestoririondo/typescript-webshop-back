import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: Number(process.env.DB_PORT),
  password: process.env.DB_PASSWORD,
});

export default pool;
