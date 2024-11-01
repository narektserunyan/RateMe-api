import express from 'express';
import { createUser, getProfile, searchUsers, getDashbord } from '../controllers/userController';

const router = express.Router();

router.post('/user/register', createUser);
router.post('/user/getProfile', getProfile);
router.post('/user/search', searchUsers);
router.post('/user/dashboard', getDashbord);

export default router;