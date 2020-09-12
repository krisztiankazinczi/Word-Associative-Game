import React from "react";
import "./ResultRow.css";

function ResultRow({ userAnswer, correctAnswer, options, words }) {
  return (
    <div className="resultRow" style={userAnswer === correctAnswer ? {backgroundColor: '#bbd196'} : {backgroundColor: "lightcoral"}}>
      <div className="resultRow__words">
        {words.map((word, id) => (
          <h2 key={word} className="resultRow__word" style={{ backgroundColor: "#900c3f", color: "white" }}>
            {word}
          </h2>
        ))}
      </div>
      <div className="resultRow__options">
        {options.map((option, id) => (
          <h2
            key={option}
            className="resultRow__option"
            style={
              id + 1 === correctAnswer
                ? { backgroundColor: "green", color: "white" }
                : { backgroundColor: "red", color: "white" }
            }
          >
            {option}
          </h2>
        ))}
      </div>
    </div>
  );
}

export default ResultRow;
