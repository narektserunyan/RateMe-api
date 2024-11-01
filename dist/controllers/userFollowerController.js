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
exports.followUser = void 0;
const userFollower_1 = require("../models/userFollower");
const followUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid, uid_follower } = req.body;
    if (!uid || !uid_follower) {
        res
            .status(400)
            .json({ message: 'user UID and uid_follower are required.' });
        return;
    }
    try {
        const result = yield (0, userFollower_1.addUsersFollower)({ uid, uid_follower });
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: 'Error calling follow', error });
    }
});
exports.followUser = followUser;
//# sourceMappingURL=userFollowerController.js.map