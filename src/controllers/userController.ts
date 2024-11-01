import { Request, Response } from 'express';
import { insertUser, getUser, findUsers } from '../models/user';
import {
  getFollowersForUID,
  getFollowingsForUID
} from '../models/userFollower';
import { getProductsByUID, getUserProductByCodeForUID } from '../models/userProduct';

import fs from 'fs';

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
    const user = await getUser(uid);
    if (user) {
      res.status(201).json({ message: 'User exists' });
    } else {
      await insertUser({
        uid: uid,
        email: email,
        password: password,
        name: '',
        imagePath: '',
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
    const user = await getUser(uid);
    if (user) {
      const following = await getFollowingsForUID(uid);
      const followers = await getFollowersForUID(uid);
      const products = await getProductsByUID(uid);

      res.json({
        user: user,
        followers: followers,
        following: following,
        products: products,
      });
    } else {
      res.status(400).json({ message: 'user not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

export const searchUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { uid, query } = req.body;
  if (!uid || !query) {
    res.status(400).json({ message: 'query and uid are required.' });
    return;
  }
  try {
    const users = await findUsers(query, uid);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error finding users', error });
  }
};

export const getDashbord = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { uid } = req.body;
  if (!uid) {
    res.status(400).json({ message: 'user UID is required.' });
    return;
  }
  try {
    const user = await getUser(uid);
    if (user) {
      const followings = await getFollowingsForUID(uid);

      const productsOfFollowings = (
        await Promise.all(
          followings.map(async (following) => {
            const products = await getProductsByUID(following.uid);

            const productsWithImagesAndUser = await Promise.all(
              products.map(async (product) => {
                const myRateDetails = await getUserProductByCodeForUID(product.code, following.uid);

                if (myRateDetails.isPublic === 0) {
                  return null;
                }
                return {
                  ...product,
                  imageOfOwner: following.imagePath,
                  nameOfOwner: following.name,
                  ownerRating: myRateDetails.rating,
                  updatedAt: myRateDetails.updatedAt,
                  description: myRateDetails.description
                };
              })
            ).then(results => results.filter(product => product !== null));

            return products.length
              ? productsWithImagesAndUser
              : null; // Return null if no products
          })
        )
      ).flatMap((products) => products || []); // Flatten and remove null entries

      const myProducts = await getProductsByUID(uid);
      const productsWithImages = await Promise.all(
        myProducts.map(async (product) => {   
          const myRateDetails = await getUserProductByCodeForUID(product.code, uid);
          return {
            ...product,
            imageOfOwner: user.imagePath,
            nameOfOwner: user.name,
            ownerRating: myRateDetails.rating,
            updatedAt: myRateDetails.updatedAt,
            description: myRateDetails.description
          };
        })
      );

      const products = productsOfFollowings.concat(productsWithImages);

      res.json(products);
    } else {
      res.status(400).json({ message: 'user not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};
