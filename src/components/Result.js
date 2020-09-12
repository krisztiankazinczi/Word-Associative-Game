import React from "react";
import { useStateValue } from "../store/StateProvider";
import { isGameFinished, getTotalScore } from "../store/selectors";

import { Redirect } from "react-router-dom";

import ResultRow from "./ResultRow";

function Result() {
  const [{ quizQuestions }] = useStateValue();

  if (!quizQuestions || !isGameFinished(quizQuestions)) {
    return <Redirect to="/quiz" />;
  }

  return (
    <div
      style={{
        backgroundColor: "#511845",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: "20px"
      }}
    >
      <h2 style={{fontSize: "32px", color: "#ff5733", fontWeight: "900"}}>Total Score: {getTotalScore(quizQuestions)} / 10</h2>
      {quizQuestions.map((question, id) => (
        <ResultRow
          key={id}
          userAnswer={question.answer}
          correctAnswer={question.correct}
          options={question.option}
          words={question.quiz}
        />
      ))}
    </div>
  );
}

export default Result;
