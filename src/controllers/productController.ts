import { Request, Response } from 'express';
import { getProduct, insertProduct } from '../models/products';
import {
  addUserProduct,
  getProductByCodeForUID,
  getProductsByUID,
  getUserProductByCodeForUID,
} from '../models/userProduct';
import { uploadFileToDropbox } from '../config/dropboxUploadService';


export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { uid, code, name, description, rating, isPublic } = req.body;
  const file = req.file?.path;
  const path = await uploadFileToDropbox(file!, true);

  if (!code || !file || !uid || !rating) {
    res.status(400).json({ message: 'Code, file, uid, rating are required.' });
    return;
  }
  try {
    var product = await getProduct(code);
    if (!product) {
      await insertProduct({
        imagePath: path,
        code: code,
        name: name,
        rating: rating,
      });
    }
    await addUserProduct({ uid, code, description, rating, isPublic });

    const products = await getProductsByUID(uid);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving product' });
  }
};

export const searchProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { code, uid } = req.body;
  if (!code || !uid) {
    res.status(400).json({ message: 'code and uid are required.' });
    return;
  }
  try {
    const globalProduct = await getProductByCodeForUID(code, uid);
    if (!globalProduct) {
      const product = await getProduct(code);
      res.json(product);
    } else {
      const myRateDetails = await getUserProductByCodeForUID(code, uid);
      res.json({
        myRateDetails,
        name: globalProduct.name,
        imagePath: globalProduct.imagePath,
        rating: globalProduct.rating,
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};