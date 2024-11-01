"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const userProductsRoutes_1 = __importDefault(require("./routes/userProductsRoutes"));
const userFollowerRoutes_1 = __importDefault(require("./routes/userFollowerRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use('/api', userRoutes_1.default, userProductsRoutes_1.default, productRoutes_1.default, userFollowerRoutes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map