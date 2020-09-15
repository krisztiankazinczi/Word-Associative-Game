import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import clsx from "clsx";

import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";

const styles = (theme) => ({
  ...theme.otherStyles,
  container: {
    width: '100%',
  },
  resultsRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: "10px",
    padding: "5px",
    borderRadius: "5px",
    width: "60%",
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  wordContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  words: {
    padding: "5px",
    borderRadius: "2px",
    marginRight: "10px",
    marginTop: "5px",
    marginBottom: "5px",
  },
  wordsColor: {
    backgroundColor: theme.otherStyles.secondaryBackgroundColor.backgroundColor,
    color: "white",
  },
  answerContainer: {
    marginTop: "5px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: '20%',
    marginLeft: 'auto',
    marginRight: 'auto',
    '& > div': {
      width: '100%'
    }
  },
  spaces: {
    margin: 0,
    padding: "5px",
  },
  playerName: {
    fontSize: "24px",
    color: theme.otherStyles.mainTextColor.color,
    padding: '5px'
  },
  correctBorder: {
    border: "2px solid",
    borderColor: theme.otherStyles.correctAnswer.backgroundColor,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  incorrectBorder: {
    border: "2px solid",
    borderColor: theme.otherStyles.incorrectAnswer.backgroundColor,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  correctIcon: {
    color: theme.otherStyles.correctAnswer.backgroundColor,
    fontWeight: 700
  },
  incorrectIcon: {
    color: theme.otherStyles.incorrectAnswer.backgroundColor,
    fontWeight: 700
  }
});

const ResultRow = ({
  userAnswer,
  correctAnswer,
  options,
  words,
  otherAnswers,
  classes,
}) => {
  return (
    <div className={classes.container}>
      <div
        className={clsx(
          classes.resultsRow,
          userAnswer === correctAnswer
            ? classes.correctAnswer
            : classes.incorrectAnswer
        )}
      >
        <div className={classes.wordContainer}>
          {words.map((word, id) => (
            <h2 key={word} className={clsx(classes.words, classes.wordsColor)}>
              {word}
            </h2>
          ))}
        </div>
        <div className={classes.wordContainer}>
          {options.map((option, id) => (
            <h2
              key={option}
              className={clsx(
                classes.words,
                id + 1 === correctAnswer
                  ? classes.correctOption
                  : classes.incorrectOption
              )}
            >
              {option}
            </h2>
          ))}
        </div>
      </div>
      {otherAnswers && (
        <div className={classes.answerContainer}>
          {Object.entries(otherAnswers).map(([username, answer]) => (
            <div
              className={
                (answer === correctAnswer
                  ? classes.correctBorder
                  : classes.incorrectBorder)
              }
            >
              <h3 className={clsx(classes.playerName, classes.spaces)}>{username}:</h3>
              {answer === correctAnswer ? (
                <CheckIcon className={clsx(classes.correctIcon, classes.spaces)} />
              ) : (
                <ClearIcon className={clsx(classes.incorrectIcon, classes.spaces)} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default withStyles(styles)(ResultRow);
