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
exports.getGlobalProduct = exports.insertGlobalProduct = exports.createGlobalProductsTable = void 0;
const database_1 = require("../config/database");
const createGlobalProductsTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDB)();
    yield db.exec(`
        CREATE TABLE IF NOT EXISTS globalProducts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            imagePath TEXT NOT NULL,
            code TEXT NOT NULL,
            name TEXT NOT NULL,
            rating REAL  -- Add rating as a floating-point number
        )
    `);
});
exports.createGlobalProductsTable = createGlobalProductsTable;
const insertGlobalProduct = (_a) => __awaiter(void 0, [_a], void 0, function* ({ imagePath, code, name, rating }) {
    const db = yield (0, database_1.openDB)();
    yield db.run(`INSERT INTO globalProducts (imagePath, code, name, rating) VALUES (?, ?, ?, ?)`, [imagePath, code, name, rating]);
});
exports.insertGlobalProduct = insertGlobalProduct;
const getGlobalProduct = (code) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDB)();
    const product = yield db.get(`SELECT * FROM globalProducts WHERE code = ?`, [code]);
    return product;
});
exports.getGlobalProduct = getGlobalProduct;
//# sourceMappingURL=globalProducts.js.map