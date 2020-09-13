import React, { useState, useEffect } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";

import "./Quiz.css";

import { useStateValue } from "../store/StateProvider";
import { answerQuestion } from "../store/actions";
import { Redirect, Link } from "react-router-dom";

import socketIOClient from "socket.io-client";

import { collectAllAnswers } from "../store/selectors";

import Spinner from "./Spinner";

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
  },
});

const ENDPOINT = "http://localhost:3030";

const Quiz = ({ classes }) => {
  const [
    { quiz, currentQuestion, currentGameMode, username },
    dispatch,
  ] = useStateValue();
  const [finished, setFinished] = useState(false); // finished game in SinglePLayer mode or finished my game in multiPlayer mode
  const [multiFinished, setMultiFinished] = useState(false); // when server informs us, that everyone finished the game or the time limit passed

  useEffect(() => {
    if (currentGameMode.gameMode === 'singlePlayer') return;

    const socket = socketIOClient(ENDPOINT);

    socket.emit("join-room", currentGameMode.roomId, username);

    socket.on("quiz-finished", (gameResult) => {
      setMultiFinished(true);
    });

    return () => socket.disconnect();
  }, []);

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
  if (!quiz?.quizQuestions) {
    return <Redirect to="/newGame" />;
  }

  const submitAnswersToServer = () => {
      const myAnswers = collectAllAnswers(quiz.quizQuestions);
      const socket = socketIOClient(ENDPOINT);
      socket.emit(
        "submit-answers",
        currentGameMode.roomId,
        username,
        myAnswers
      );
  };

  return (
    <div className={classes.quiz}>
      <div className={classes.halfWidth}>
        {(finished && currentGameMode.gameMode === "singlePlayer") ||
        multiFinished ? (
          <div className={classes.quizFinished}>
            <Link to="/result">Check Result</Link>
          </div>
        ) : finished && currentGameMode.gameMode === "multiPlayer" ? (
          <div>
            <button onClick={submitAnswersToServer}>Send</button>
            <h3>Waiting for other players....</h3>
            <Spinner />
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
              {quiz.quizQuestions[currentQuestion].quiz.map((word, idx) => (
                <h3 key={idx}>{word}</h3>
              ))}
            </div>
            <div className={classes.quizOptions}>
              {quiz.quizQuestions[currentQuestion].option.map((option, idx) => (
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
