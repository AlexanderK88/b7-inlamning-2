function chooseWord(wordList, desiredLength, uniqueLetters) {
  const filteredList = wordList.filter((word) => word.length === desiredLength && (!uniqueLetters || new Set(word).size === word.length));

  if (!filteredList.length) {
    throw new Error('Inget passande ord finns.');
  }

  const randomWord = filteredList[Math.floor(Math.random() * filteredList.length)];

  return randomWord;
}

export default chooseWord;
