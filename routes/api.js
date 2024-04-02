import express from 'express';
import { generateWord } from '../src/generateWord.js';
import { feedback } from '../src/feedback.js';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const apiRouter = express.Router();

apiRouter.get('/word', async (req, res) => {
  const desiredLength = parseInt(req.query.length) || 5;
  const uniqueLetters = req.query.unique === 'true';
  try {
    const word = await generateWord(desiredLength, uniqueLetters);
    res.json({ word });
  } catch (e) {
    res.status(500).json({ error: 'An error occurred while fetching the words.' });
  }
});

apiRouter.post('/feedback', express.json(), async (req, res) => {
  const { guess, rightAnswer } = req.body;
  if (!guess || !rightAnswer) {
    return res.status(400).json({ error: 'Both guess and rightAnswer are required.' });
  }
  try {
    const results = feedback(guess, rightAnswer);
    res.json(results);
  } catch (e) {
    res.status(500).json({ error: 'An error occurred while processing the guess.' });
  }
});

apiRouter.post('/submitscore', express.json(), async (req, res) => {
  const { wordLength, timeTaken, uniqueLetters, guesses, userName, correctWord } = req.body;

  const url = process.env.MONGO_URI;

  const dbName = 'wordleDatabase';

  const client = new MongoClient(url);

  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('scores');

    const result = await collection.insertOne({
      userName,
      correctWord,
      wordLength,
      timeTaken,
      uniqueLetters,
      guesses,
    });

    res.status(200).json({ message: 'Data received.' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'An error occurred while submitting the score.' });
  } finally {
    await client.close();
  }
});

export default apiRouter;
