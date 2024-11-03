"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const productController_1 = require("../controllers/productController");
const router = express_1.default.Router();
const storage = multer_1.default.memoryStorage(); // Use memory storage
const upload = (0, multer_1.default)({ storage });
router.post('/products/search', productController_1.searchProduct);
router.post('/products/add', upload.single('image'), productController_1.createProduct);
exports.default = router;
//# sourceMappingURL=productRoutes.js.map