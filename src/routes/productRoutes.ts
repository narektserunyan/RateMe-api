import express from 'express';
import multer from 'multer';
import path from 'path';
import { searchProduct, createProduct } from '../controllers/productController';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');  // Save to 'uploads' directory
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Save with unique filename
    }
});

const router = express.Router();
const upload = multer({ storage });

router.post('/products/search', searchProduct);
router.post('/products/add', upload.single('image'), createProduct);

export default router;