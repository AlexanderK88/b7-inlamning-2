import fetch from 'node-fetch';

async function fetchWords() {
  const response = await fetch('https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const words = await response.json();
  return Object.keys(words);
}

export default fetchWords;
