import React, { useState } from 'react';

export default function GameEndScreen({ wordLength, timeTaken, uniqueLetters, onReplay, guesses }) {
  const [userName, setUserName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitData = async () => {
    const response = await fetch('/api/submitscore', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        wordLength,
        timeTaken,
        uniqueLetters,
        guesses,
        userName,
      }),
    });

    if (response.ok) {
      setIsSubmitted(true);
    } else {
      console.error('Failed to submit data');
    }
  };

  return (
    <div className="game-end-screen">
      <h2>Congratulations, you won!</h2>
      <p>Word length: {wordLength}</p>
      <p>Time taken: {timeTaken} seconds</p>
      <p>Unique letters: {uniqueLetters ? 'Yes' : 'No'}</p>
      <p>Guesses: {guesses}</p>
      {!isSubmitted && (
        <>
          <input className="input" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Enter your name" />
          <button className="button" onClick={submitData}>
            Submit Data
          </button>
        </>
      )}
      <button className="button" onClick={onReplay}>
        Replay
      </button>
    </div>
  );
}
