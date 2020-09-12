import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { Redirect } from "react-router-dom";

import { useStateValue } from "../store/StateProvider";

import { newGame } from "../store/actions";

import "./NewGame.css";

const styles = (theme) => ({
  ...theme.otherStyles,
  button: {
    ...theme.otherStyles.button,
    fontSize: "35px",
    padding: "10px 30px",
    borderRadius: "10px",
  },
  modeContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
  },
  options: {
    display: "flex",
    width: "50%",
    alignItems: "center",
    "& > h2": {
      fontSize: "36px",
      color: theme.otherStyles.orangeColor.color,
      fontWeight: 700,
      flex: 0.5,
    },
  },
  dropDown: {
    flex: 0.5,
    color: theme.otherStyles.orangeColor.color,
    "&:before": {
      borderColor: theme.otherStyles.orangeColor.color,
    },
    "&:after": {
      borderColor: theme.otherStyles.orangeColor.color,
    },
    "&:hover:not(.Mui-disabled):before": {
      borderColor: theme.otherStyles.orangeColor.color,
    },
    // '&.MuiList-padding': {
    //   paddingTop: 0,
    //   paddingBottom: 0
    // }
  },
  icon: {
    fill: theme.otherStyles.orangeColor.color,
  },
  halfWidth: {
    width: "50%",
  },
  menuItem: {
    color: theme.otherStyles.orangeColor.color,
    backgroundColor: theme.otherStyles.secondaryBackgroundColor.backgroundColor,
    '&:hover': {
      background: theme.otherStyles.secondaryBackgroundColorHovered.backgroundColor,
    },
    '&.Mui-selected': {
      background: theme.otherStyles.secondaryBackgroundColor.backgroundColor,
    },
    '&.Mui-selected:hover': {
      background: theme.otherStyles.secondaryBackgroundColorHovered.backgroundColor,
    }
  },
});

function NewGame({ classes }) {
  const [area, setArea] = useState("sat");
  const [level, setLevel] = useState(5);
  const [redirectToQuiz, setRedirectToQuiz] = useState(false);
  const [mode, setMode] = useState(""); // single or multi
  const [redirectToRoom, setRedirectToRoom] = useState(false);
  const [roomID, setRoomID] = useState("");

  const [{}, dispatch] = useStateValue();

  const categories = [
    "es",
    "ms",
    "hs",
    "ksat",
    "toeic",
    "toefl",
    "teps",
    "sat",
    "ielts",
    "gre",
    "gmat",
    "overall",
  ];

  const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const startSingleGame = () => {
    fetch(
      `https://twinword-word-association-quiz.p.rapidapi.com/type1/?area=${area}&level=${level}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "twinword-word-association-quiz.p.rapidapi.com",
          "x-rapidapi-key":
            "5e1990fcb7msh1cd4491b7cf3c1ap17a83fjsn4f69b58c7396",
        },
      }
    )
      .then((resp) => resp.json())
      .then((res) => {
        dispatch(newGame(res.quizlist));
        setRedirectToQuiz(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const startMultiGame = async () => {
    const response = await fetch("http://localhost:3030/getRoomID");
    const res = await response.json();
    if (typeof res === "string") {
      setRoomID(res);
      setRedirectToRoom(true);
    }
    //error Handling...
  };

  const selectGameMode = (event) => {
    const gameMode = event.target.getAttribute("data-value");
    setMode(gameMode);
  };

  if (redirectToQuiz) {
    return (
      <Redirect
        to={{
          pathname: "/quiz",
        }}
      />
    );
  }

  if (redirectToRoom) {
    return (
      <Redirect
        to={{
          pathname: `/room/${roomID}`,
          state: { area, level },
        }}
      />
    );
  }

  if (!mode) {
    return (
      <div
        className={`${classes.modeContainer} ${classes.mainBackgroundColor}`}
      >
        <h2
          data-value="single"
          className={classes.button}
          onClick={(e) => selectGameMode(e)}
        >
          Single Player
        </h2>
        <h2
          data-value="multi"
          className={classes.button}
          onClick={(e) => selectGameMode(e)}
        >
          Multiplayer
        </h2>
      </div>
    );
  }

  return (
    <div className={`${classes.modeContainer} ${classes.mainBackgroundColor}`}>
      <div className={classes.options}>
        <h2>Category</h2>
        <Select
          name="area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className={classes.dropDown}
          inputProps={{classes: {
            icon: classes.icon
          }}}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} className={classes.menuItem} value={cat}>
              {cat.toUpperCase()}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className={classes.options}>
        <h2>Level</h2>
        <Select
          name="level"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className={classes.dropDown}
          inputProps={{classes: {
            icon: classes.icon
          }}}
        >
          {levels.map((level) => (
            <MenuItem key={level} className={classes.menuItem} value={level}>
              {level}
            </MenuItem>
          ))}
        </Select>
      </div>

      <Button
        size="large"
        className={`${classes.button} ${classes.halfWidth}`}
        variant="contained"
        onClick={
          mode === "single"
            ? startSingleGame
            : mode === "multi"
            ? startMultiGame
            : ""
        }
      >
        <Typography variant="h5">Start</Typography>
      </Button>
    </div>
  );
}

export default withStyles(styles)(NewGame);
