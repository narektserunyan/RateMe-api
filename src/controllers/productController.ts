import { Request, Response } from 'express';
import { getProduct, insertProduct, Product } from '../models/products';
import {
  addUserProduct,
  getProductByCodeForUID,
  getProductsByUID,
  getUserProductByCodeForUID,
  UserProduct,
} from '../models/userProduct';
import { uploadFileToDropbox } from '../config/dropboxUploadService';

export const createProduct = async (req: Request, res: Response) => {
  const { uid, code, name, description, rating, is_public } = req.body;

  if (!code || !req.file || !uid || !rating) {
    res.status(400).json({ message: 'Code, file, uid, rating are required.' });
    return;
  }

  const path = await uploadFileToDropbox(req.file, true);

  try {
    var product: Product = await getProduct(code);
    if (!product) {
      await insertProduct({
        image_url: path,
        code: code,
        name: name,
        rating: rating,
      });
    }
    const updated_at = '';
    await addUserProduct({
      uid,
      code,
      description,
      rating,
      is_public,
      updated_at,
    });

    const products: [Product] = await getProductsByUID(uid);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving product' });
  }
};

export const searchProduct = async (req: Request, res: Response) => {
  const { code, uid } = req.body;
  if (!code || !uid) {
    res.status(400).json({ message: 'code and uid are required.' });
    return;
  }
  try {
    const globalProduct: Product = await getProductByCodeForUID(code, uid);
    if (!globalProduct) {
      const product: Product = await getProduct(code);
      res.json(product);
    } else {
      const myRateDetails: UserProduct = await getUserProductByCodeForUID(
        code,
        uid
      );
      res.json({
        myRateDetails,
        name: globalProduct.name,
        image_url: globalProduct.image_url,
        rating: globalProduct.rating,
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};
