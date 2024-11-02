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
exports.openDB = void 0;
const { Pool } = require('pg');
require('dotenv').config();
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    ssl: {
        rejectUnauthorized: false, // Allows connection without checking certificate validity
    },
});
const openDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield pool.connect();
    return client;
});
exports.openDB = openDB;
pool.on('error', (error) => {
    console.error('Unexpected error on idle client', error);
});
//# sourceMappingURL=database.js.map