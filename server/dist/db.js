"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const promise_1 = require("mysql2/promise");
exports.db = promise_1.default.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Vachette2002',
    database: 'movies_db'
});
