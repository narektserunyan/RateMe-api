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
exports.getProductByCodeForUID = exports.getProductsByUID = exports.addUserProduct = exports.createUserProductConnectionTable = void 0;
const database_1 = require("../config/database");
const createUserProductConnectionTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDB)();
    yield db.exec(`
        CREATE TABLE IF NOT EXISTS user_products (
            uid INTEGER NOT NULL,
            code INTEGER NOT NULL,
            FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE,
            FOREIGN KEY (code) REFERENCES products(code) ON DELETE CASCADE,
            PRIMARY KEY (uid, code)
        );
    `);
});
exports.createUserProductConnectionTable = createUserProductConnectionTable;
const addUserProduct = (uid, code) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDB)();
    yield db.run(`
      INSERT INTO user_products (uid, code)
      VALUES (?, ?)
    `, [uid, code]);
});
exports.addUserProduct = addUserProduct;
const getProductsByUID = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDB)();
    return db.all(`
      SELECT products.* 
      FROM products 
      INNER JOIN user_products ON products.code = user_products.code 
      WHERE user_products.uid = ?
    `, [uid]);
});
exports.getProductsByUID = getProductsByUID;
const getProductByCodeForUID = (code, uid) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDB)();
    return db.all(`
      SELECT products.* 
      FROM products 
      INNER JOIN user_products ON products.code = user_products.code 
      WHERE user_products.uid = ? AND products.code = ?
    `, [uid, code]);
});
exports.getProductByCodeForUID = getProductByCodeForUID;
//# sourceMappingURL=userProductConnection.js.map