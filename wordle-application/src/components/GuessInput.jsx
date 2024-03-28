export default function GuessInput({ guess, onGuessChange, onGuessSubmit }) {
  return (
    <>
      <input className="input" type="text" value={guess} onChange={(e) => onGuessChange(e.target.value)} />
      <button className="button" onClick={onGuessSubmit}>
        Submit Guess
      </button>
    </>
  );
}
