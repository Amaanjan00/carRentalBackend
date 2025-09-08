import dotenv from 'dotenv'
import connectDB from './database/db.js';
import { app } from './app.js';

dotenv.config({path: './.env'});
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port \n \n ${'*'.repeat(50)} \n http://localhost:${PORT} \n \n ${'*'.repeat(50)} \n`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });
