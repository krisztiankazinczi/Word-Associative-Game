import React, { useState } from "react";

import "./Quiz.css";

import { useStateValue } from "../store/StateProvider";
import { answerQuestion } from "../store/actions";
import { Redirect, Link } from "react-router-dom";


const Quiz = () => {
  const [{ quizQuestions, currentQuestion }, dispatch] = useStateValue();
  const [finished, setFinished] = useState(false);



  const selectAnswer = (event) => {
    
    const questionNumber = parseInt(
      event.target.getAttribute("data-question-number")
    );
    const answer = parseInt(event.target.getAttribute("data-answer"));
    dispatch(answerQuestion({ questionNumber, answer }));

    if (currentQuestion === 9) {
      setFinished(true);
      return;
    }
  };

  // redirect if the user comes to this page without starting a newGame or did not have a saved game
  if (!quizQuestions) {
    return <Redirect to="/newGame" />;
  }

  return (
    <div className="quiz" style={{ backgroundColor: "#511845" }}>
      <div className="quiz__container">
        {finished ? (
          <div className="quiz__finish">
            <Link to="/result">Check Result</Link>
          </div>
        ) : (
          <div>
            <h3 style={{ color: "#FF5733", textDecoration: "underline" }}>
              Select the most related word to the first 3 ones!
            </h3>
            <div className="quiz__words">
              {quizQuestions[currentQuestion].quiz.map((word, idx) => (
                <h3
                  style={{
                    padding: "10px",
                    fontSize: "25px",
                    color: "#FF5733",
                  }}
                  key={idx}
                >
                  {word}
                </h3>
              ))}
            </div>
            <div className="quiz__options">
              {quizQuestions[currentQuestion].option.map((option, idx) => (
                <h3
                  style={{
                    backgroundColor: "#ffa931",
                    padding: "10px",
                    color: "#c70039",
                  }}
                  key={idx}
                  data-question-number={currentQuestion}
                  data-answer={idx + 1}
                  onClick={(e) => selectAnswer(e)}
                >
                  {option}
                </h3>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
