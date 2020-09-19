import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
// clsx a Material UI package used for combining multiple classes on 1 component
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
    border: "3px solid",
    borderColor: theme.otherStyles.correctAnswer.backgroundColor,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  incorrectBorder: {
    border: "3px solid",
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
    // displays the actual user's question and selected answer conditionally. If the answer were correct than other styles will be applied then not
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
          {words.map((word) => (
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
      {/* If the mode was multiPlayer, then we will see everyones answers under each quiz questions. Also the display styles depends on the correctness of the question */}
      {otherAnswers && (
        <div className={classes.answerContainer}>
          {Object.entries(otherAnswers).map(([username, answer], id) => (
            <div
              key={id}
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

//connect to Material UI Theme Provider
export default withStyles(styles)(ResultRow);
