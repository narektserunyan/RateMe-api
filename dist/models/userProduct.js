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
exports.getUserProductByCodeForUID = exports.getProductByCodeForUID = exports.getProductsByUID = exports.addUserProduct = exports.createUserProductConnectionTable = void 0;
const database_1 = require("../config/database");
const createUserProductConnectionTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDB)();
    yield db.query(`
        CREATE TABLE IF NOT EXISTS user_products (
            uid TEXT NOT NULL,
            code TEXT NOT NULL,
            description TEXT NOT NULL,
            rating REAL,
            is_public BOOLEAN DEFAULT FALSE,  -- BOOLEAN with default value FALSE
            created_at TIMESTAMP DEFAULT NOW(),  -- Automatically set the creation date
            updated_at TIMESTAMP DEFAULT NOW(),  -- Automatically set the modification date

            PRIMARY KEY (uid, code),
            FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE,
            FOREIGN KEY (code) REFERENCES products(code) ON DELETE CASCADE
        );
    `);
});
exports.createUserProductConnectionTable = createUserProductConnectionTable;
const addUserProduct = (_a) => __awaiter(void 0, [_a], void 0, function* ({ uid, code, description, rating, is_public, }) {
    const db = yield (0, database_1.openDB)();
    yield db.query(`
        INSERT INTO user_products ( uid, code, description, rating, is_public)
        VALUES ($1, $2, $3, $4, $5)
    `, [uid, code, description, rating, is_public]);
});
exports.addUserProduct = addUserProduct;
const getProductsByUID = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDB)();
    const result = yield db.query(`
      SELECT products.* 
      FROM products 
      INNER JOIN user_products ON products.code = user_products.code 
      WHERE user_products.uid = $1
    `, [uid]);
    return result.rows;
});
exports.getProductsByUID = getProductsByUID;
const getProductByCodeForUID = (code, uid) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDB)();
    const res = yield db.query(`
      SELECT products.* 
      FROM products 
      INNER JOIN user_products ON products.code = user_products.code 
      WHERE user_products.uid = $1 AND products.code = $2
    `, [uid, code]);
    return res.rows[0] || null;
});
exports.getProductByCodeForUID = getProductByCodeForUID;
const getUserProductByCodeForUID = (code, uid) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDB)();
    const res = yield db.query(`SELECT * FROM user_products WHERE code = $1 AND uid = $2`, [code, uid]);
    return res.rows[0] || null;
});
exports.getUserProductByCodeForUID = getUserProductByCodeForUID;
//# sourceMappingURL=userProduct.js.map