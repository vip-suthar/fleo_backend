import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 8000,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost:27017/fleo_db'
};