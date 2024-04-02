import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

async function getHighScores() {
  const url = process.env.MONGO_URI;
  const dbName = 'wordleDatabase';

  const client = new MongoClient(url);

  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('scores');

    const highScores = await collection.find().toArray();
    return highScores;
  } catch (e) {
    console.error(e);
    throw new Error('An error occurred while fetching the high scores.');
  } finally {
    await client.close();
  }
}

export default getHighScores;
