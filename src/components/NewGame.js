import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { Redirect } from "react-router-dom";

import { useStateValue } from "../store/StateProvider";

import { newGame } from "../store/actions";

import "./NewGame.css";

function NewGame() {
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
    const response = await fetch("http://localhost:3030/getRoomID")
    const res = await response.json()
    if (typeof res === 'string') {
      setRoomID(res)
      setRedirectToRoom(true)
    }
    //error Handling...
  }

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
          state: { area, level }
        }}
      />
    )
  }

  if (!mode) {
    return (
      <div className="newGame__modeContainer">
        <h2 data-value="single" onClick={(e) => selectGameMode(e)}>
          Single Player
        </h2>
        <h2 data-value="multi" onClick={(e) => selectGameMode(e)}>
          Multiplayer
        </h2>
      </div>
    );
  }

  return (
    <div className="newGame__settingsContainer">
      <div className="newGame__category">
        <h2>Category</h2>
        <Select
          name="area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="newGame__dropDown"
        >
          {categories.map((cat) => (
            <MenuItem key={cat} className="newGame__menuItem" value={cat}>
              {cat.toUpperCase()}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className="newGame__level">
        <h2>Level</h2>
        <Select
          name="level"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="newGame__dropDown"
        >
          {levels.map((level) => (
            <MenuItem key={level} className="newGame__menuItem" value={level}>
              {level}
            </MenuItem>
          ))}
        </Select>
      </div>

      <Button
        size="large"
        className="newGame__button"
        variant="contained"
        onClick={mode === 'single' ? startSingleGame : mode === 'multi' ? startMultiGame : ''}
      >
        <Typography variant="h5">Start</Typography>
      </Button>
    </div>
  );

  /*
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh", backgroundColor: "#511845" }}
    >
      <Grid item xs={3} container style={{ color: "#ff5733" }} spacing={4}>
        <Grid item xs={6}>
          <Typography variant="h4">Category</Typography>
        </Grid>
        <Grid item xs={6} className="newGame__inputContainer">
          <Select
            name="area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="newGame__dropDown"
          >
            {categories.map((cat) => (
              <MenuItem key={cat} className="newGame__menuItem" value={cat}>
                {cat.toUpperCase()}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="h4">Level</Typography>
        </Grid>
        <Grid item xs={6}>
          <Select
            name="level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="newGame__dropDown"
          >
            {levels.map((level) => (
              <MenuItem key={level} className="newGame__menuItem" value={level}>
                {level}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid
          item
          xs={12}
          container
          alignItems="center"
          className="newGame__inputContainer"
        >
          <Button
            size="large"
            className="newGame__button"
            style={{ backgroundColor: "#900c3f" }}
            variant="contained"
            onClick={startGame}
          >
            <Typography style={{ color: "#ff5733" }} variant="h5">
              Start
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );*/
}

export default NewGame;
