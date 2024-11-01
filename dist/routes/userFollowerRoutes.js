"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userFollowerController_1 = require("../controllers/userFollowerController");
const router = express_1.default.Router();
router.post('/user/follow', userFollowerController_1.followUser);
exports.default = router;
//# sourceMappingURL=userFollowerRoutes.js.map