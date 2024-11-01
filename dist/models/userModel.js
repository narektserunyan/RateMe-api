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
exports.getUser = exports.insertUser = exports.createUsersTable = void 0;
const database_1 = require("../config/database");
const createUsersTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDB)();
    yield db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            uid TEXT NOT NULL UNIQUE,
            followers INTEGER NOT NULL,
            following INTEGER NOT NULL
        )
    `);
});
exports.createUsersTable = createUsersTable;
const insertUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ uid, email, password }) {
    const db = yield (0, database_1.openDB)();
    yield db.run(`INSERT INTO users (uid, email, password, followers, following) VALUES (?, ?, ?, ?, ?)`, [uid, email, password, 0, 0]);
});
exports.insertUser = insertUser;
const getUser = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDB)();
    const user = yield db.get(`SELECT * FROM users WHERE uid = ?`, [uid]);
    return user;
});
exports.getUser = getUser;
//# sourceMappingURL=userModel.js.map