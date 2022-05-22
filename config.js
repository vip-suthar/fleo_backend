import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 8000,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost:27017/fleo_db', // mongodb+srv://vip_voting_app:yUQO0kcDHFQd5hW9@cluster0.gswzb.mongodb.net/voting_app?retryWrites=true&w=majority
};