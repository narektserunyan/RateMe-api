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
exports.getUser = exports.findUsers = exports.insertUser = exports.Drops = exports.createUsersTable = void 0;
const database_1 = require("../config/database");
const createUsersTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDB)();
    yield db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        uid TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        password TEXT NOT NULL,
        image_url TEXT NOT NULL
      )
    `);
});
exports.createUsersTable = createUsersTable;
const Drops = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDB)();
    yield db.query(`
      DROP TABLE IF EXISTS user_follower;
      DROP TABLE IF EXISTS user_products;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
    `);
});
exports.Drops = Drops;
const insertUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ uid, email, password }) {
    const db = yield (0, database_1.openDB)();
    yield db.query(`INSERT INTO users (uid, email, password, name, image_url) VALUES ($1, $2, $3, $4, $5)`, [uid, email, password, email, '']);
});
exports.insertUser = insertUser;
const findUsers = (query, uid) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDB)();
    const searchQuery = `%${query}%`; // Prepare the query for partial matching
    const result = yield db.query(`
      SELECT email, name, image_url 
      FROM users
      WHERE (name ILIKE $1 OR email ILIKE $1)
      AND uid != $2
  `, [searchQuery, uid]);
    return result.rows;
});
exports.findUsers = findUsers;
const getUser = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDB)();
    const user = yield db.query(`
    SELECT email, name, image_url 
    FROM users 
    WHERE uid = $1
    `, [uid]);
    return user.rows[0] || null;
});
exports.getUser = getUser;
//# sourceMappingURL=user.js.map