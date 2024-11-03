"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProduct = exports.createProduct = void 0;
const products_1 = require("../models/products");
const userProduct_1 = require("../models/userProduct");
const dropboxUploadService_1 = require("../config/dropboxUploadService");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid, code, name, description, rating, is_public } = req.body;
    if (!code || !req.file || !uid || !rating) {
        res.status(400).json({ message: 'Code, file, uid, rating are required.' });
        return;
    }
    const path = yield (0, dropboxUploadService_1.uploadFileToDropbox)(req.file, true);
    try {
        var product = yield (0, products_1.getProduct)(code);
        if (!product) {
            yield (0, products_1.insertProduct)({
                image_url: path,
                code: code,
                name: name,
                rating: rating,
            });
        }
        const updated_at = '';
        yield (0, userProduct_1.addUserProduct)({
            uid,
            code,
            description,
            rating,
            is_public,
            updated_at,
        });
        const products = yield (0, userProduct_1.getProductsByUID)(uid);
        res.json(products);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving product' });
    }
});
exports.createProduct = createProduct;
const searchProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, uid } = req.body;
    if (!code || !uid) {
        res.status(400).json({ message: 'code and uid are required.' });
        return;
    }
    try {
        const globalProduct = yield (0, userProduct_1.getProductByCodeForUID)(code, uid);
        if (!globalProduct) {
            const product = yield (0, products_1.getProduct)(code);
            res.json(product);
        }
        else {
            const myRateDetails = yield (0, userProduct_1.getUserProductByCodeForUID)(code, uid);
            res.json({
                myRateDetails,
                name: globalProduct.name,
                image_url: globalProduct.image_url,
                rating: globalProduct.rating,
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});
exports.searchProduct = searchProduct;
//# sourceMappingURL=productController.js.map