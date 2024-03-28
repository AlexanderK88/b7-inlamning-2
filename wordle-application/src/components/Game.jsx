import { useState } from 'react';
import FeedbackDisplay from './FeedbackDisplay';
import GuessInput from './GuessInput';
import GameEndScreen from './GameEndScreen';

export default function Game({ word, uniqueLetters, onGameEnd }) {
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState([]);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(null);
  const [modalMessage, setModalMessage] = useState(null);

  const handleGuess = async () => {
    if (!startTime) {
      setStartTime(new Date());
    }

    if (guess.length !== word.length) {
      setModalMessage('You have guessed an invalid amount of letters!');
      return;
    }

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ guess, rightAnswer: word }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setFeedback((prevFeedback) => [...prevFeedback, data]);

      if (data.every((item) => item.result === 'correct')) {
        setEndTime(new Date());
      }
    } catch (error) {
      console.error('Error sending guess:', error);
    }
  };

  if (endTime) {
    const timeTaken = Math.round((endTime - startTime) / 1000);
    return (
      <GameEndScreen wordLength={word.length} timeTaken={timeTaken} uniqueLetters={uniqueLetters} onReplay={onGameEnd} guesses={feedback.length} />
    );
  }

  return (
    <>
      {modalMessage && (
        <div className="modal">
          <p>{modalMessage}</p>
          <button onClick={() => setModalMessage(null)}>OK</button>
        </div>
      )}
      <h1>Lets play Wordle!</h1>
      <p className="instructions">
        Instructions: You chose a word length of {word.length}. Now, guess a word with the same number of letters. Then click "Submit Guess" to submit
        your guess. {word}
      </p>
      <FeedbackDisplay feedback={feedback} />
      <GuessInput guess={guess} onGuessChange={setGuess} onGuessSubmit={handleGuess} />
    </>
  );
}
