import fetchWords from './fetchWords.js';
import chooseWord from './chooseWord.js';

export async function generateWord(desiredLength, uniqueLetters) {
  try {
    const wordList = await fetchWords();
    const word = chooseWord(wordList, desiredLength, uniqueLetters);
    return word;
  } catch (e) {
    console.error('An error occurred while fetching the words.', e);
  }
}
