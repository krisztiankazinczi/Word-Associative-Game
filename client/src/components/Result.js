import React, { useEffect } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { useStateValue } from "../store/StateProvider";
import {
  isGameFinished,
  getTotalScore,
  getTotalScoreOfEveryone,
} from "../store/selectors";
import { deleteDataFromStore } from "../store/actions";

import { Link, Redirect } from "react-router-dom";

import ResultRow from "./ResultRow";
import { Button, Typography } from "@material-ui/core";

const styles = (theme) => ({
  ...theme.otherStyles,
  result: {
    backgroundColor: theme.otherStyles.mainBackgroundColor.backgroundColor,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "20px",
    "& > div > h2, & > div > div > h2": {
      fontSize: "32px",
      color: theme.otherStyles.orangeColor.color,
      fontWeight: "900",
    },
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "60%",
  },
  text: {
    color: theme.otherStyles.orangeColor.color,
  },
  link: {
    textDecoration: "none",
    display: "block",
  },
});

function Result({ classes }) {
  const [
    {
      quiz,
      currentGameMode: { gameMode },
    },
    dispatch,
  ] = useStateValue();

  useEffect(() => {
    return () => {
      dispatch(deleteDataFromStore());
    };
  });

  if (!quiz?.quizQuestions || !isGameFinished(quiz?.quizQuestions)) {
    return <Redirect to="/quiz" />;
  }

  return (
    <div className={classes.result}>
      <div className={classes.row}>
        {gameMode === "singlePlayer" ? (
          <h2>Total Score: {getTotalScore(quiz.quizQuestions)} / 10</h2>
        ) : (
          <div>
            {Object.entries(
              getTotalScoreOfEveryone(quiz.quizQuestions, quiz.playersAnswers)
            ).map(([username, totalScore], id) => (
              <h2 key={id}>
                {username}: {totalScore} / 10
              </h2>
            ))}
          </div>
        )}
        <Link to="/newGame" className={classes.link}>
          <Button size="large" className={classes.button} variant="contained">
            <Typography className={classes.text} variant="h5">
              New Game
            </Typography>
          </Button>
        </Link>
      </div>
      {quiz.quizQuestions.map((question, id) => (
        <ResultRow
          key={id}
          userAnswer={question.answer}
          correctAnswer={question.correct}
          options={question.option}
          words={question.quiz}
          otherAnswers={
            gameMode === "multiPlayer" ? quiz.playersAnswers[id] : false
          }
        />
      ))}
    </div>
  );
}

export default withStyles(styles)(Result);
