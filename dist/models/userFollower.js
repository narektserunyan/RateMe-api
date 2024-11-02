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
exports.getFollowersForUID = exports.getFollowingsForUID = exports.addUsersFollower = exports.createUserFollowerTable = void 0;
const database_1 = require("../config/database");
const createUserFollowerTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDB)();
    yield db.exec(`
        CREATE TABLE IF NOT EXISTS user_follower (
            uid INTEGER NOT NULL,
            uid_follower INTEGER NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),  -- Automatically set the creation date

            FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE,
            FOREIGN KEY (uid_follower) REFERENCES users(uid) ON DELETE CASCADE,
            PRIMARY KEY (uid, uid_follower)
        );
    `);
});
exports.createUserFollowerTable = createUserFollowerTable;
const addUsersFollower = (_a) => __awaiter(void 0, [_a], void 0, function* ({ uid, uid_follower, }) {
    const db = yield (0, database_1.openDB)();
    yield db.run(`
      INSERT INTO user_follower (uid, uid_follower)
      VALUES ($1, $2)
      ON CONFLICT (uid, uid_follower) DO NOTHING  -- Prevents duplicate entries
      `, [uid, uid_follower]);
});
exports.addUsersFollower = addUsersFollower;
const getFollowingsForUID = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDB)();
    return db.all(`
    SELECT users.email, users.name, users.uid, users.imagePath
    FROM users 
    INNER JOIN user_follower ON users.uid = user_follower.uid_follower 
    WHERE user_follower.uid = $1
  `, [uid]);
});
exports.getFollowingsForUID = getFollowingsForUID;
const getFollowersForUID = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDB)();
    return db.all(`
    SELECT users.email, users.uid, users.imagePath
    FROM users 
    INNER JOIN user_follower ON users.uid = user_follower.uid
    WHERE user_follower.uid_follower = $1
  `, [uid]);
});
exports.getFollowersForUID = getFollowersForUID;
//# sourceMappingURL=userFollower.js.map