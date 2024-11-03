import { Request, Response } from 'express';
import { addUsersFollower } from '../models/userFollower';

export const followUser = async (req: Request, res: Response) => {
  const { uid, uid_follower } = req.body;
  if (!uid || !uid_follower) {
    res
      .status(400)
      .json({ message: 'user UID and uid_follower are required.' });
    return;
  }
  try {
    const result = await addUsersFollower({ uid, uid_follower });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error calling follow', error });
  }
};
