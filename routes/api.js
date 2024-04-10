import express from 'express';
import { generateWord } from '../src/generateWord.js';
import { feedback } from '../src/feedback.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Score from '../src/scores.js';

dotenv.config();

const apiRouter = express.Router();

apiRouter.use(express.json());

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

apiRouter.post('/feedback', async (req, res) => {
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

apiRouter.post('/submitscore', async (req, res) => {
  const { wordLength, timeTaken, uniqueLetters, guesses, userName, correctWord } = req.body;

  const url = process.env.MONGO_URI;

  try {
    await mongoose.connect(url);

    const score = new Score({
      userName,
      correctWord,
      wordLength,
      timeTaken,
      uniqueLetters,
      guesses,
    });

    const result = await score.save();

    res.status(200).json({ message: 'Data received.' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'An error occurred while submitting the score.' });
  } finally {
    await mongoose.connection.close();
  }
});

export default apiRouter;
