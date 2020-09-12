import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { useStateValue } from "../store/StateProvider";
import { isGameFinished, getTotalScore } from "../store/selectors";

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
    "& > div > h2": {
      fontSize: "32px",
      color: "#ff5733",
      fontWeight: "900",
    },
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '60%'
  },
  text: {
    color: "#ff5733",
  },
  link: {
    textDecoration: 'none',
    display: 'block'
  }
});

function Result({ classes }) {
  const [{ quizQuestions }] = useStateValue();

  if (!quizQuestions || !isGameFinished(quizQuestions)) {
    return <Redirect to="/quiz" />;
  }

  return (
    <div className={classes.result}>
      <div className={classes.row}>
        <h2>Total Score: {getTotalScore(quizQuestions)} / 10</h2>
        <Link to="/newGame" className={classes.link}>
          <Button size="large" className={classes.button} variant="contained">
            <Typography className={classes.text} variant="h5">
              New Game
            </Typography>
          </Button>
        </Link>
      </div>
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

export default withStyles(styles)(Result);
