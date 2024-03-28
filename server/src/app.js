import express from 'express';
import { generateWord } from './generateWord.js';
import { feedback } from './feedback.js';

const app = express();

app.get('/api/word', async (req, res) => {
  const desiredLength = parseInt(req.query.length) || 5;
  const uniqueLetters = req.query.unique === 'true';
  try {
    const word = await generateWord(desiredLength, uniqueLetters);
    res.json({ word });
  } catch (e) {
    res.status(500).json({ error: 'An error occurred while fetching the words.' });
  }
});

app.post('/api/feedback', express.json(), async (req, res) => {
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

app.post('/api/submitscore', express.json(), (req, res) => {
  const { wordLength, timeTaken, uniqueLetters, guesses, userName } = req.body;
  console.log({
    wordLength,
    timeTaken,
    uniqueLetters,
    guesses,
    userName,
  });
  res.status(200).json({ message: 'Data received.' });
});

export default app;
