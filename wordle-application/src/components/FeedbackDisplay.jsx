export default function FeedbackDisplay({ feedback }) {
  return (
    <div className="feedbackDisplay">
      {feedback.map((guessFeedback, index) => (
        <div key={index} className="feedbackDisplay__guessFeedback">
          {guessFeedback.map((item, i) => (
            <div key={i} className={`feedbackDisplay__letterBox ${item.result}`}>
              {item.letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
