"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const productController_1 = require("../controllers/productController");
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Save to 'uploads' directory
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path_1.default.extname(file.originalname)); // Save with unique filename
    }
});
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ storage });
router.post('/products/search', productController_1.searchProduct);
router.post('/products/add', upload.single('image'), productController_1.createProduct);
exports.default = router;
//# sourceMappingURL=productRoutes.js.map