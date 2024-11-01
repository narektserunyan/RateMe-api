import { openDB } from '../config/database';

export const createUserFollowerTable = async (): Promise<void> => {
  const db = await openDB();
  await db.exec(`
        CREATE TABLE IF NOT EXISTS user_follower (
            uid INTEGER NOT NULL,
            uid_follower INTEGER NOT NULL,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,  -- Automatically set the creation date

            FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE,
            FOREIGN KEY (uid_follower) REFERENCES users(uid) ON DELETE CASCADE,
            PRIMARY KEY (uid, uid_follower)
        );
    `);
};

interface UserFollower {
    uid: string;
    uid_follower: string;
}

export const addUsersFollower = async ({ uid, uid_follower}: UserFollower): Promise<void> => {
    const db = await openDB();
    await db.run(`
        INSERT INTO user_follower ( uid, uid_follower)
        VALUES (?, ?)
    `, [uid, uid_follower]);
  };

  export const getFollowingsForUID = async (uid: String) => {
    const db = await openDB();
    return db.all(`
      SELECT users.email, users.name, users.uid, users.imagePath
      FROM users 
      INNER JOIN user_follower ON users.uid = user_follower.uid_follower 
      WHERE user_follower.uid = ?
    `, [uid]);
  };

  export const getFollowersForUID = async (uid: String) => {
    const db = await openDB();
    return db.all(`
      SELECT users.email, users.uid, users.imagePath
      FROM users 
      INNER JOIN user_follower ON users.uid = user_follower.uid
      WHERE user_follower.uid_follower = ?
    `, [uid]);
  };