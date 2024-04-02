export default function GuessInput({ guess, onGuessChange, onGuessSubmit }) {
  const handleSubmit = () => {
    onGuessSubmit();
    onGuessChange('');
  };

  return (
    <>
      <input className="input" type="text" value={guess} onChange={(e) => onGuessChange(e.target.value)} />
      <button className="button" onClick={handleSubmit}>
        Submit Guess
      </button>
    </>
  );
}
