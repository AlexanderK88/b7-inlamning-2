import Score from './scores.js';

async function getHighScores() {
  try {
    const highScores = await Score.find().lean();
    return highScores;
  } catch (e) {
    console.error(e);
    throw new Error('An error occurred while fetching the high scores.');
  }
}

export default getHighScores;
