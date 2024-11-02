import { openDB } from '../config/database';

export const createUsersTable = async (): Promise<void> => {
  const db = await openDB();
  await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        uid TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        password TEXT NOT NULL,
        imagePath TEXT NOT NULL
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
  imagePath: string;
}

export const insertUser = async ({
  uid,
  email,
  password,
}: User): Promise<void> => {
  const db = await openDB();
  await db.query(
    `INSERT INTO users (uid, email, password, name, imagePath) VALUES ($1, $2, $3, $4, $5)`,
    [uid, email, password, email, '']
  );
};

export const findUsers = async (query: string, uid: string) => {
  const db = await openDB();
  const searchQuery = `%${query}%`; // Prepare the query for partial matching

  return db.all(
    `
      SELECT email, name, imagePath 
      FROM users
      WHERE (name LIKE ? OR email LIKE ?)
      AND uid != ?
  `,
    [searchQuery, searchQuery, uid]
  );
};

export const getUser = async (uid: String): Promise<User> => {
  const db = await openDB();
  const user = await db.query(
    `
    SELECT email, name, imagePath 
    FROM users 
    WHERE uid = $1
    `,
    [uid]
  );
  return user;
};
