import app from './src/app.js';
import mongoose from 'mongoose';
import 'dotenv/config';

const url = process.env.MONGO_URI;

mongoose
  .connect(url)
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

app.listen(5080, () => {
  console.log('listening on port 5080');
});
