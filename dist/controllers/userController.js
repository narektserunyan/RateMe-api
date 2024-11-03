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
exports.getDashbord = exports.searchUsers = exports.getProfile = exports.createUser = void 0;
const user_1 = require("../models/user");
const userFollower_1 = require("../models/userFollower");
const userProduct_1 = require("../models/userProduct");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid, email, password } = req.body;
    if (!email || !uid || !password) {
        res
            .status(400)
            .json({ message: 'Email, user UID, and password are required.' });
        return;
    }
    try {
        const user = yield (0, user_1.getUser)(uid);
        if (user) {
            res.status(201).json({ message: 'User exists' });
        }
        else {
            yield (0, user_1.insertUser)({
                uid: uid,
                email: email,
                password: password,
                name: '',
                image_url: '',
            });
            res.status(200).json({ message: 'User is created' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});
exports.createUser = createUser;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.body;
    if (!uid) {
        res.status(400).json({ message: 'user UID is required.' });
        return;
    }
    try {
        const user = yield (0, user_1.getUser)(uid);
        if (!user) {
            res.status(400).json({ message: 'user not found' });
            return;
        }
        const following = yield (0, userFollower_1.getFollowingsForUID)(uid);
        const followers = yield (0, userFollower_1.getFollowersForUID)(uid);
        const products = yield (0, userProduct_1.getProductsByUID)(uid);
        res.json({
            user: user,
            followers: followers,
            following: following,
            products: products,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});
exports.getProfile = getProfile;
const searchUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid, query } = req.body;
    if (!uid || !query) {
        res.status(400).json({ message: 'query and uid are required.' });
        return;
    }
    try {
        const users = yield (0, user_1.findUsers)(query, uid);
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Error finding users', error });
    }
});
exports.searchUsers = searchUsers;
const getDashbord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.body;
    if (!uid) {
        res.status(400).json({ message: 'user UID is required.' });
        return;
    }
    try {
        const user = yield (0, user_1.getUser)(uid);
        if (!user) {
            res.status(400).json({ message: 'user not found' });
            return;
        }
        const followings = yield (0, userFollower_1.getFollowingsForUID)(uid);
        const productsOfFollowings = (yield Promise.all(followings.map((following) => __awaiter(void 0, void 0, void 0, function* () {
            const products = yield (0, userProduct_1.getProductsByUID)(following.uid);
            const productsWithImagesAndUser = yield Promise.all(products.map((product) => __awaiter(void 0, void 0, void 0, function* () {
                const myRateDetails = yield (0, userProduct_1.getUserProductByCodeForUID)(product.code, following.uid);
                if (myRateDetails.is_public === 0) {
                    return null;
                }
                return Object.assign(Object.assign({}, product), { imageOfOwner: following.image_url, nameOfOwner: following.name, ownerRating: myRateDetails.rating, updatedAt: myRateDetails.updated_at, description: myRateDetails.description });
            }))).then((results) => results.filter((product) => product !== null));
            return products.length ? productsWithImagesAndUser : null; // Return null if no products
        })))).flatMap((products) => products || []); // Flatten and remove null entries
        const myProducts = yield (0, userProduct_1.getProductsByUID)(uid);
        const productsWithImages = yield Promise.all(myProducts.map((product) => __awaiter(void 0, void 0, void 0, function* () {
            const myRateDetails = yield (0, userProduct_1.getUserProductByCodeForUID)(product.code, uid);
            return Object.assign(Object.assign({}, product), { imageOfOwner: user.image_url, nameOfOwner: user.name, ownerRating: myRateDetails.rating, updatedAt: myRateDetails.updated_at, description: myRateDetails.description });
        })));
        const products = productsOfFollowings.concat(productsWithImages);
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});
exports.getDashbord = getDashbord;
//# sourceMappingURL=userController.js.map