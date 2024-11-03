import { openDB } from '../config/database';

export const createUserProductConnectionTable = async (): Promise<void> => {
  const db = await openDB();
  await db.query(`
        CREATE TABLE IF NOT EXISTS user_products (
            uid TEXT NOT NULL,
            code TEXT NOT NULL,
            description TEXT NOT NULL,
            rating REAL,
            is_public BOOLEAN DEFAULT FALSE,  -- BOOLEAN with default value FALSE
            created_at TIMESTAMP DEFAULT NOW(),  -- Automatically set the creation date
            updated_at TIMESTAMP DEFAULT NOW(),  -- Automatically set the modification date

            PRIMARY KEY (uid, code),
            FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE,
            FOREIGN KEY (code) REFERENCES products(code) ON DELETE CASCADE
        );
    `);
};

export interface UserProduct {
  uid: string;
  code: string;
  description: string;
  rating: number;
  is_public: number;
  updated_at: string;
}

export const addUserProduct = async ({
  uid,
  code,
  description,
  rating,
  is_public,
}: UserProduct): Promise<void> => {
  const db = await openDB();
  await db.query(
    `
        INSERT INTO user_products ( uid, code, description, rating, is_public)
        VALUES ($1, $2, $3, $4, $5)
    `,
    [uid, code, description, rating, is_public]
  );
};

export const getProductsByUID = async (uid: String) => {
  const db = await openDB();
  const result = await db.query(
    `
      SELECT products.* 
      FROM products 
      INNER JOIN user_products ON products.code = user_products.code 
      WHERE user_products.uid = $1
    `,
    [uid]
  );
  return result.rows;
};

export const getProductByCodeForUID = async (code: String, uid: String) => {
  const db = await openDB();
  const res = await db.query(
    `
      SELECT products.* 
      FROM products 
      INNER JOIN user_products ON products.code = user_products.code 
      WHERE user_products.uid = $1 AND products.code = $2
    `,
    [uid, code]
  );
  return res.rows[0] || null;
};

export const getUserProductByCodeForUID = async (code: String, uid: String) => {
  const db = await openDB();
  const res = await db.query(
    `SELECT * FROM user_products WHERE code = $1 AND uid = $2`,
    [code, uid]
  );
  return res.rows[0] || null;
};
