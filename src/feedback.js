export function feedback(guess, rightAnswer) {
  let guessArray = guess.toUpperCase().split('');
  let rightAnswerArray = rightAnswer.toUpperCase().split('');
  let results = [];

  for (let i = 0; i < guessArray.length; i++) {
    if (guessArray[i] === rightAnswerArray[i]) {
      results[i] = { letter: guessArray[i], result: 'correct' };
      rightAnswerArray[i] = null;
    } else {
      results[i] = { letter: guessArray[i], result: 'incorrect' };
    }
  }

  for (let i = 0; i < guessArray.length; i++) {
    if (results[i].result === 'incorrect' && rightAnswerArray.includes(guessArray[i])) {
      results[i].result = 'misplaced';
      rightAnswerArray[rightAnswerArray.indexOf(guessArray[i])] = null;
    }
  }

  return results;
}
