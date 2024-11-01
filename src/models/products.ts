import { openDB } from '../config/database';

export const createProductsTable = async () => {
    const db = await openDB();
    await db.exec(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            code TEXT NOT NULL,
            name TEXT NOT NULL,
            imagePath TEXT NOT NULL,
            rating REAL
        )
    `);
  };

  interface Product {
    imagePath: string;
    code: string;
    name: string;
    rating: number;
  }

  export const insertProduct = async ({ imagePath, code, name, rating }: Product): Promise<void> => {
    const db = await openDB();
    await db.run(
        `INSERT INTO products (imagePath, code, name, rating) VALUES (?, ?, ?, ?)`,
        [imagePath, code, name, rating]
    );
  };

  export const getProduct = async ( code : String ): Promise<Product> => {
    const db = await openDB();
    const product = await db.get(`SELECT * FROM products WHERE code = ?`, [code]);
    return product
  };