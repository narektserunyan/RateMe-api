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
exports.getProducts = void 0;
const userProduct_1 = require("../models/userProduct");
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.body;
    if (!uid) {
        res
            .status(400)
            .json({ message: 'user UID is required.' });
        return;
    }
    try {
        const products = yield (0, userProduct_1.getProductsByUID)(uid);
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: 'Error getting product', error });
    }
});
exports.getProducts = getProducts;
//# sourceMappingURL=userProductController.js.map