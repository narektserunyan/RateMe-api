import { Request, Response } from 'express';
import { insertUser, getUser, findUsers, User } from '../models/user';
import { Product } from '../models/products';
import {
  getFollowersForUID,
  getFollowingsForUID,
} from '../models/userFollower';
import {
  getProductsByUID,
  getUserProductByCodeForUID,
  UserProduct,
} from '../models/userProduct';

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { uid, email, password } = req.body;
  if (!email || !uid || !password) {
    res
      .status(400)
      .json({ message: 'Email, user UID, and password are required.' });
    return;
  }
  try {
    const user: User = await getUser(uid);
    if (user) {
      res.status(201).json({ message: 'User exists' });
    } else {
      await insertUser({
        uid: uid,
        email: email,
        password: password,
        name: '',
        image_url: '',
      });
      res.status(200).json({ message: 'User is created' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

export const getProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { uid } = req.body;
  if (!uid) {
    res.status(400).json({ message: 'user UID is required.' });
    return;
  }
  try {
    const user: User = await getUser(uid);
    if (!user) {
      res.status(400).json({ message: 'user not found' });
      return;
    }

    const following: [User] = await getFollowingsForUID(uid);
    const followers: [User] = await getFollowersForUID(uid);
    const products: [Product] = await getProductsByUID(uid);

    res.json({
      user: user,
      followers: followers,
      following: following,
      products: products,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

export const searchUsers = async (req: Request, res: Response) => {
  const { uid, query } = req.body;
  if (!uid || !query) {
    res.status(400).json({ message: 'query and uid are required.' });
    return;
  }
  try {
    const users: [User] = await findUsers(query, uid);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error finding users', error });
  }
};

export const getDashbord = async (req: Request, res: Response) => {
  const { uid } = req.body;
  if (!uid) {
    res.status(400).json({ message: 'user UID is required.' });
    return;
  }
  try {
    const user: User = await getUser(uid);
    if (!user) {
      res.status(400).json({ message: 'user not found' });
      return;
    }

    const followings: [User] = await getFollowingsForUID(uid);
    const productsOfFollowings = (
      await Promise.all(
        followings.map(async (following) => {
          const products: [Product] = await getProductsByUID(following.uid);

          const productsWithImagesAndUser = await Promise.all(
            products.map(async (product) => {
              const myRateDetails: UserProduct =
                await getUserProductByCodeForUID(product.code, following.uid);

              if (myRateDetails.is_public === 0) {
                return null;
              }
              return {
                ...product,
                imageOfOwner: following.image_url,
                nameOfOwner: following.name,
                ownerRating: myRateDetails.rating,
                updatedAt: myRateDetails.updated_at,
                description: myRateDetails.description,
              };
            })
          ).then((results) => results.filter((product) => product !== null));

          return products.length ? productsWithImagesAndUser : null; // Return null if no products
        })
      )
    ).flatMap((products) => products || []); // Flatten and remove null entries

    const myProducts: [Product] = await getProductsByUID(uid);
    const productsWithImages = await Promise.all(
      myProducts.map(async (product) => {
        const myRateDetails: UserProduct = await getUserProductByCodeForUID(
          product.code,
          uid
        );
        return {
          ...product,
          imageOfOwner: user.image_url,
          nameOfOwner: user.name,
          ownerRating: myRateDetails.rating,
          updatedAt: myRateDetails.updated_at,
          description: myRateDetails.description,
        };
      })
    );

    const products = productsOfFollowings.concat(productsWithImages);

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};
