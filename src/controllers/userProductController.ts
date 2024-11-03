import { Request, Response } from 'express';
import { getProductsByUID } from '../models/userProduct';

export const getProducts = async (req: Request, res: Response) => {
  const { uid } = req.body;
  if (!uid) {
    res.status(400).json({ message: 'user UID is required.' });
    return;
  }
  try {
    const products = await getProductsByUID(uid);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error getting product', error });
  }
};
