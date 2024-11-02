import app from './app';
import { createUsersTable, Drops } from './models/user';
import { createProductsTable } from './models/products';
import { createUserProductConnectionTable } from './models/userProduct';
import { createUserFollowerTable } from './models/userFollower';

// Create an Express application
const port = process.env.PORT || 10000;

const init = async () => {
  // await Drops();
  await createUsersTable();
  await createProductsTable();
  await createUserProductConnectionTable();
  await createUserFollowerTable();

  // Start the server
  app.listen(port, () => {
    console.log(`API is running on http://localhost:${port}`);
  });
};

// Initialize the database before the app starts listening
init();