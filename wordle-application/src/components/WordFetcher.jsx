import { useState } from 'react';

function WordFetcher({ onFetch }) {
  const [length, setLength] = useState('5');
  const [unique, setUnique] = useState(false);

  const fetchWord = async () => {
    const response = await fetch(`/api/word?length=${length}&unique=${unique}`);
    const data = await response.json();
    onFetch(data.word, unique);
  };

  return (
    <div className="wordFetcher">
      <h1>Lets play Wordle!</h1>
      <p className="instructions">
        Instructions: Choose the length of the word and whether it should contain unique letters. Then click "Start Game" to begin.
      </p>
      <div className="wordFetcher__option">
        <label>
          Word Length:
          <select className="wordFetcher__input" value={length} onChange={(e) => setLength(e.target.value)}>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
        </label>
      </div>
      <div className="wordFetcher__option">
        <label>
          Unique Letters Only:
          <input className="wordFetcher__input" type="checkbox" checked={unique} onChange={(e) => setUnique(e.target.checked)} />
        </label>
      </div>
      <div className="wordFetcher__option">
        <button className="button" onClick={fetchWord}>
          Start Game
        </button>
      </div>
    </div>
  );
}

export default WordFetcher;
