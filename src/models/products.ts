import { openDB } from '../config/database';

export const createProductsTable = async (): Promise<void> => {
  const db = await openDB();
  await db.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        code VARCHAR(36) NOT NULL UNIQUE,
        name VARCHAR(20) NOT NULL,
        image_url VARCHAR(150) NOT NULL,
        rating REAL
      )
    `);
};

export interface Product {
  image_url: string;
  code: string;
  name: string;
  rating: number;
}

export const insertProduct = async ({
  image_url,
  code,
  name,
  rating,
}: Product): Promise<void> => {
  const db = await openDB();
  await db.query(
    `INSERT INTO products (image_url, code, name, rating) VALUES ($1, $2, $3, $4)`,
    [image_url, code, name, rating]
  );
};

export const getProduct = async (code: String): Promise<Product> => {
  const db = await openDB();
  const res = await db.query('SELECT * FROM products WHERE code = $1', [code]);
  return res.rows[0] || null;
};
