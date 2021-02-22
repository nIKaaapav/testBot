import {connectToMongoDb} from './conectToMongoDB';
import config from '../config'

export default async function() {
    await connectToMongoDb(config);
    console.log('✌ MongoDB loaded and connected.');
}