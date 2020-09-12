import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import clsx from "clsx";

const styles = (theme) => ({
  ...theme.otherStyles,
  resultsRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: "10px",
    padding: "5px",
    borderRadius: "5px",
    width: "60%",
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
    marginTop: '5px',
    marginBottom: '5px'
  },
  wordsColor: {
    backgroundColor: theme.otherStyles.secondaryBackgroundColor.backgroundColor,
    color: 'white',
  },
});

function ResultRow({ userAnswer, correctAnswer, options, words, classes }) {
  return (
    <div
      className={clsx(
        classes.resultsRow,
        userAnswer === correctAnswer
          ? classes.correctAnswer
          : classes.uncorrectAnswer
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
                : classes.uncorrectOption
            )}
          >
            {option}
          </h2>
        ))}
      </div>
    </div>
  );
}

export default withStyles(styles)(ResultRow);
