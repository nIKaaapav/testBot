import dotenv from 'dotenv';

const enviroment = dotenv.config();

if (!enviroment) {
    throw new Error('Config file was not found');
}

export default {
    MONGODB_URI: process.env.MONGODB_URI,
    TOKEN_BOT: process.env.TOKEN_BOT,
    URL: process.env.URL
}