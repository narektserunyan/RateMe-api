"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.post('/user/register', userController_1.createUser);
router.post('/user/getProfile', userController_1.getProfile);
router.post('/user/search', userController_1.searchUsers);
router.post('/user/dashboard', userController_1.getDashbord);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map