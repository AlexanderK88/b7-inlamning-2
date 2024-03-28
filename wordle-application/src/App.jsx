import { useState } from 'react';
import WordFetcher from './components/WordFetcher';
import Game from './components/Game';

function App() {
  const [gameState, setGameState] = useState({
    word: '',
    gameStarted: false,
    uniqueLetters: false,
  });

  const handleFetch = (fetchedWord, unique) => {
    setGameState({
      word: fetchedWord,
      gameStarted: true,
      uniqueLetters: unique,
    });
  };

  const resetGame = () => {
    setGameState({
      word: '',
      gameStarted: false,
      uniqueLetters: false,
    });
  };

  return (
    <div className="app">
      {!gameState.gameStarted && <WordFetcher onFetch={handleFetch} />}
      {gameState.gameStarted && <Game word={gameState.word} uniqueLetters={gameState.uniqueLetters} onGameEnd={resetGame} />}
    </div>
  );
}

export default App;
