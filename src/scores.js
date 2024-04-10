import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({
  userName: String,
  correctWord: String,
  wordLength: Number,
  timeTaken: Number,
  uniqueLetters: Boolean,
  guesses: Number,
});

const Score = mongoose.model('Score', scoreSchema);

export default Score;
