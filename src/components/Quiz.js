import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";

import "./Quiz.css";

import { useStateValue } from "../store/StateProvider";
import { answerQuestion } from "../store/actions";
import { Redirect, Link } from "react-router-dom";

const styles = (theme) => ({
  ...theme.otherStyles,
  quiz: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.otherStyles.mainBackgroundColor.backgroundColor,
  },
  quizInfo: {
    textDecoration: "underline",
    color: theme.otherStyles.mainTextColor.color,
  },
  quizFinished: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& > a": {
      color: theme.otherStyles.orangeColor.color,
      backgroundColor:
        theme.otherStyles.secondaryBackgroundColor.backgroundColor,
      borderRadius: "5px",
      padding: "10px",
      fontSize: "40px",
      fontWeight: 700,
      textDecoration: "none",
    },
    "& > a:hover": {
      backgroundColor:
        theme.otherStyles.secondaryBackgroundColorHovered.backgroundColor,
    },
  },
  quizWords: {
    display: "flex",
    justifyContent: "space-evenly",
    "& > h3": {
      fontSize: "25px",
      color: theme.palette.primary.main,
    },
  },
  quizOptions: {
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: "5vh",
    "& > h3": {
      padding: "10px",
      fontSize: "25px",
      borderRadius: "3px",
    },
    "& h3:not(:first-child)": {
      marginLeft: "5%",
    },
  },
  quizQuestionNumber: {
    color: theme.otherStyles.orangeColor.color,
    fontWeight: 500,
  }
});

const Quiz = ({ classes }) => {
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
    <div className={classes.quiz}>
      <div className={classes.halfWidth}>
        {finished ? (
          <div className={classes.quizFinished}>
            <Link to="/result">Check Result</Link>
          </div>
        ) : (
          <div>
            <Typography variant="h3" className={classes.quizQuestionNumber}>
            {currentQuestion + 1} / 10
            </Typography>
            <h3 className={classes.quizInfo}>
              Select the most related word to the first 3 ones!
            </h3>
            <div className={classes.quizWords}>
              {/* <h3>{currentQuestion + 1} / 10:</h3> */}
              {quizQuestions[currentQuestion].quiz.map((word, idx) => (
                <h3 key={idx}>{word}</h3>
              ))}
            </div>
            <div className={classes.quizOptions}>
              {quizQuestions[currentQuestion].option.map((option, idx) => (
                <h3
                  className={classes.button}
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

export default withStyles(styles)(Quiz);
