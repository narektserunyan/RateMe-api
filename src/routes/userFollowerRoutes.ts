import express from 'express';
import { followUser } from '../controllers/userFollowerController';

const router = express.Router();

router.post('/user/follow', followUser);

export default router;