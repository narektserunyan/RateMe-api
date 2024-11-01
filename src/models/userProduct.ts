import { openDB } from '../config/database';

export const createUserProductConnectionTable = async (): Promise<void> => {
  const db = await openDB();
  await db.exec(`
        CREATE TABLE IF NOT EXISTS user_products (
            uid INTEGER NOT NULL,
            code INTEGER NOT NULL,
            description TEXT NOT NULL,
            rating REAL,
            isPublic INTEGER DEFAULT 0,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,  -- Automatically set the creation date
            updated_at TEXT DEFAULT CURRENT_TIMESTAMP,  -- Automatically set the modification date

            FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE,
            FOREIGN KEY (code) REFERENCES products(code) ON DELETE CASCADE,
            PRIMARY KEY (uid, code)
        );
    `);
};

  interface UserProduct {
    uid: string;
    code: string;
    description: string;
    rating: number;
    isPublic: number;
  }


  export const addUserProduct = async ({ uid, code, description, rating, isPublic }: UserProduct): Promise<void> => {
    const db = await openDB();
    await db.run(`
        INSERT INTO user_products ( uid, code, description, rating, isPublic)
        VALUES (?, ?, ?, ?, ?)
    `, [uid, code, description, rating, isPublic]);
  };
  
  export const getProductsByUID = async (uid: String) => {
    const db = await openDB();
    return db.all(`
      SELECT products.* 
      FROM products 
      INNER JOIN user_products ON products.code = user_products.code 
      WHERE user_products.uid = ?
    `, [uid]);
  };

  export const getProductByCodeForUID = async (code: String, uid: String) => {
    const db = await openDB();
    return db.get(`
      SELECT products.* 
      FROM products 
      INNER JOIN user_products ON products.code = user_products.code 
      WHERE user_products.uid = ? AND products.code = ?
    `, [uid, code]);
  };

  export const getUserProductByCodeForUID = async (code: String, uid: String) => {
    const db = await openDB();
    const userProduct = await db.get(`SELECT * FROM user_products WHERE code = ? AND uid = ?`, [code, uid]);
    return userProduct
  };


  // export const getUserProductsForUID = async (uid: String) => {
  //   const db = await openDB();
  //   const userProduct = await db.get(`SELECT * FROM user_products WHERE uid = ?`, [uid]);
  //   return userProduct
  // };