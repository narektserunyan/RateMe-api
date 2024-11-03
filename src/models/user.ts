import { openDB } from '../config/database';

export const createUsersTable = async (): Promise<void> => {
  const db = await openDB();
  await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        uid VARCHAR(36) NOT NULL UNIQUE,
        email VARCHAR(30) NOT NULL UNIQUE,
        name VARCHAR(20) NOT NULL,
        password VARCHAR(16) NOT NULL,
        image_url VARCHAR(150) NOT NULL
      )
    `);
};

export const Drops = async (): Promise<void> => {
  const db = await openDB();
  await db.query(`
      DROP TABLE IF EXISTS user_follower;
      DROP TABLE IF EXISTS user_products;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
    `);
};

export interface User {
  uid: string;
  email: string;
  name: string;
  password: number;
  image_url: string;
}

export const insertUser = async ({ uid, email, password }: User) => {
  const db = await openDB();
  await db.query(
    `INSERT INTO users (uid, email, password, name, image_url) VALUES ($1, $2, $3, $4, $5)`,
    [uid, email, password, email, '']
  );
};

export const findUsers = async (
  query: string,
  uid: string
): Promise<[User]> => {
  const db = await openDB();
  const searchQuery = `%${query}%`; // Prepare the query for partial matching

  const result = await db.query(
    `
      SELECT email, name, image_url 
      FROM users
      WHERE (name ILIKE $1 OR email ILIKE $1)
      AND uid != $2
  `,
    [searchQuery, uid]
  );
  return result.rows;
};

export const getUser = async (uid: String): Promise<User> => {
  const db = await openDB();
  const user = await db.query(
    `
    SELECT email, name, image_url 
    FROM users 
    WHERE uid = $1
    `,
    [uid]
  );
  return user.rows[0] || null;
};
