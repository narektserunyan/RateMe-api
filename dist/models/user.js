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
exports.getUser = exports.findUsers = exports.insertUser = exports.createUsersTable = void 0;
const database_1 = require("../config/database");
const createUsersTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDB)();
    yield db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            uid TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            name TEXT NOT NULL,
            password TEXT NOT NULL,
            imagePath TEXT NOT NULL
        )
    `);
});
exports.createUsersTable = createUsersTable;
const insertUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ uid, email, password, }) {
    const db = yield (0, database_1.openDB)();
    yield db.run(`INSERT INTO users (uid, email, password, name, imagePath) VALUES (?, ?, ?, ?, ?)`, [uid, email, password, email, '']);
});
exports.insertUser = insertUser;
const findUsers = (query, uid) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDB)();
    const searchQuery = `%${query}%`; // Prepare the query for partial matching
    return db.all(`
      SELECT email, name, imagePath 
      FROM users
      WHERE (name LIKE ? OR email LIKE ?)
      AND uid != ?
  `, [searchQuery, searchQuery, uid]);
});
exports.findUsers = findUsers;
const getUser = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDB)();
    const user = yield db.get(`
    SELECT email, name, imagePath 
    FROM users WHERE uid = ?
    `, [uid]);
    return user;
});
exports.getUser = getUser;
//# sourceMappingURL=user.js.map