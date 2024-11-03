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
exports.getProduct = exports.insertProduct = exports.createProductsTable = void 0;
const database_1 = require("../config/database");
const createProductsTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDB)();
    yield db.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        code TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        imagePath TEXT NOT NULL,
        rating REAL
      )
    `);
});
exports.createProductsTable = createProductsTable;
const insertProduct = (_a) => __awaiter(void 0, [_a], void 0, function* ({ imagePath, code, name, rating, }) {
    const db = yield (0, database_1.openDB)();
    yield db.query(`INSERT INTO products (imagePath, code, name, rating) VALUES ($1, $2, $3, $4)`, [imagePath, code, name, rating]);
});
exports.insertProduct = insertProduct;
const getProduct = (code) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDB)();
    const res = yield db.query('SELECT * FROM products WHERE code = $1', [code]);
    return res.rows[0] || null;
});
exports.getProduct = getProduct;
//# sourceMappingURL=products.js.map