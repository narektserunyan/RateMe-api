import express from 'express';
import multer from 'multer';
import { searchProduct, createProduct } from '../controllers/productController';

const router = express.Router();

const storage = multer.memoryStorage(); // Use memory storage
const upload = multer({ storage });

router.post('/products/search', searchProduct);
router.post('/products/add', upload.single('image'), createProduct);

export default router;