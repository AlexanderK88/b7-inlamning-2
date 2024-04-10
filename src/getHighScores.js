import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Score from './scores.js'; // import the Score model

dotenv.config();

async function getHighScores() {
  const url = process.env.MONGO_URI;

  try {
    await mongoose.connect(url);

    const highScores = (await Score.find().exec()).map((doc) => doc.toObject());
    return highScores;
  } catch (e) {
    console.error(e);
    throw new Error('An error occurred while fetching the high scores.');
  } finally {
    await mongoose.connection.close();
  }
}

export default getHighScores;
