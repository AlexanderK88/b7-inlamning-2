export function feedback(guess, rightAnswer) {
  // Convert the guess and right answer to uppercase and split them into arrays and create a empty array
  let guessArray = guess.toUpperCase().split('');
  let rightAnswerArray = rightAnswer.toUpperCase().split('');
  let results = [];

  // First pass: Check for "correct" and "incorrect" letters
  // If the letter is at the correct position, mark it as "correct"
  // Remove the letter from the right answer array to avoid double counting
  // If the letter is not at the correct position, mark it as "incorrect" for now
  for (let i = 0; i < guessArray.length; i++) {
    if (guessArray[i] === rightAnswerArray[i]) {
      results[i] = { letter: guessArray[i], result: 'correct' };
      rightAnswerArray[i] = null;
    } else {
      results[i] = { letter: guessArray[i], result: 'incorrect' };
    }
  }

  // Second pass: Check for "misplaced" letters among the ones marked as "incorrect"
  // If the letter is in the right answer array but at a different position, mark it as "misplaced"
  // Remove the letter from the right answer array to avoid double counting
  for (let i = 0; i < guessArray.length; i++) {
    if (results[i].result === 'incorrect' && rightAnswerArray.includes(guessArray[i])) {
      results[i].result = 'misplaced';
      rightAnswerArray[rightAnswerArray.indexOf(guessArray[i])] = null;
    }
  }

  // Return the results array
  return results;
}
