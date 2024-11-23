import express from 'express';
import { createUser, getProfile, searchUsers, getDashbord } from '../controllers/userController';
import { searchProduct } from '../controllers/productController';

const router = express.Router();

router.post('/user/register', createUser);
router.post('/user/getProfile', getProfile);
router.post('/user/dashboard', getDashbord);
router.post('/product/search', searchProduct);

// router.post('/user/search', searchUsers);

export default router;