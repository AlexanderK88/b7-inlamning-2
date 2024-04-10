import mongoose from 'mongoose';

const Score = mongoose.model('Scores', {
  userName: String,
  correctWord: String,
  wordLength: Number,
  timeTaken: Number,
  uniqueLetters: Boolean,
  guesses: Number,
});

export default Score;
