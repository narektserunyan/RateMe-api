import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import userProductsRoutes from './routes/userProductsRoutes'; 
import userFollowerRoutes from './routes/userFollowerRoutes';

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use('/api', userRoutes, userProductsRoutes, productRoutes, userFollowerRoutes);

export default app;