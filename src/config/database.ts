const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  ssl: {
    rejectUnauthorized: false, // Allows connection without checking certificate validity
  },
});

export const openDB = async () => {
  const client = await pool.connect();
  return client;
};
