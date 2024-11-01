import express from 'express';
import { getProducts } from '../controllers/userProductController';

const router = express.Router();

router.post('/user/products', getProducts);

export default router;