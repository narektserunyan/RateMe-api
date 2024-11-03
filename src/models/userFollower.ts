import { openDB } from '../config/database';

export const createUserFollowerTable = async (): Promise<void> => {
  const db = await openDB();
  await db.query(`
        CREATE TABLE IF NOT EXISTS user_follower (
            uid TEXT NOT NULL,
            uid_follower TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),  -- Automatically set the creation date

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

export const addUsersFollower = async ({
  uid,
  uid_follower,
}: UserFollower): Promise<void> => {
    const db = await openDB();
    await db.query(`
      INSERT INTO user_follower (uid, uid_follower)
      VALUES ($1, $2)
      ON CONFLICT (uid, uid_follower) DO NOTHING  -- Prevents duplicate entries
      `, [uid, uid_follower]);
};
 
export const getFollowingsForUID = async (uid: string) => {
  const db = await openDB();
    const res = db.query(`
    SELECT users.email, users.name, users.uid, users.imagePath
    FROM users 
    INNER JOIN user_follower ON users.uid = user_follower.uid_follower 
    WHERE user_follower.uid = $1
  `, [uid]);
  return res.rows || [];
};

export const getFollowersForUID = async (uid: string) => {
  const db = await openDB();
  const res = db.query(`
    SELECT users.email, users.uid, users.imagePath
    FROM users 
    INNER JOIN user_follower ON users.uid = user_follower.uid
    WHERE user_follower.uid_follower = $1
  `, [uid]);
  return res.rows || [];
};