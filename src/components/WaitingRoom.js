import React, { useState, useEffect } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import copy from "copy-to-clipboard";
import clsx from "clsx";
import Button from "@material-ui/core/Button";

import { Redirect } from "react-router-dom";

import SetUser from "./SetUser";

import socketIOClient from "socket.io-client";
import { useStateValue } from "../store/StateProvider";

import { newGame, setGameMode } from "../store/actions";
import { Typography } from "@material-ui/core";

import Spinner from "./Spinner";

const ENDPOINT = process.env.REACT_APP_ENV_DEV ? 'http://localhost:3030' : process.env.REACT_APP_BACK_END_URL;


const styles = (theme) => ({
  ...theme.otherStyles,
  waitingRoom: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.otherStyles.mainBackgroundColor.backgroundColor,
    color: theme.otherStyles.mainTextColor.color,
    "& > h3 > span": {
      color: theme.otherStyles.orangeColor.color,
    },
  },
  button: {
    ...theme.otherStyles.button,
    fontSize: "25px",
    padding: "10px",
    borderRadius: "3px",
    textTransform: "capitalize",
  },
  copyInfo: {
    display: "flex",
    flexDirection: "row",
  },
  copiedText: {
    color: theme.otherStyles.orangeColor.color,
    marginLeft: "30px",
  },
  playersContainer: {
    backgroundColor: theme.otherStyles.secondaryBackgroundColor.backgroundColor,
    width: "60%",
    marginTop: "30px",
    "& > h3": {
      width: "80%",
      color: theme.otherStyles.orangeColor.color,
      marginLeft: "10%",
      fontSize: "25px",
      borderBottom: `1px solid ${theme.otherStyles.orangeColor.color}`,
    },
  },
  marginTop: {
    marginTop: "30px",
  },
  countDown: {
    backgroundColor: theme.otherStyles.mainBackgroundColor.backgroundColor,
    color: theme.otherStyles.orangeColor.color,
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
    '& > h2': {
      marginTop: '30px',
      fontSize: '250px'
    }
  },
  gameInfo: {
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    '& > h4': {
      color: theme.otherStyles.mainTextColor.color,
      fontSize: '40px',
      marginTop: '15px'
    }
  }
});

const WaitingRoom = ({
  classes,
  match: {
    params: { roomID },
  },
  ...props
}) => {
  const [{ username, currentGameMode }, dispatch] = useStateValue(); // values from store
  const [players, setPlayers] = useState([username]);
  const [open, setOpen] = useState(true); // dialog if user has no username in the store
  const [redirectToQuiz, setRedirectToQuiz] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [countDown, setCountDown] = useState(false);
  const [fetching, setFetching] = useState(false);

  //These came with Redirect props, but only for the room creator!!! These data needed to start the game
  const area = props.location.state?.area;
  const level = props.location.state?.level;
  const timeLimit = props.location.state?.timeLimit;

  useEffect(() => {
    if (!username) return;

    const socket = socketIOClient(ENDPOINT);
    socket.emit("join-room", roomID, username);

    socket.on("user-connected", (users) => {
      const usernames = Object.keys(users);
      setPlayers(usernames);
    });
    socket.on(
      "quiz-list",
      (
        quizlist,
        gameMode,
        createdAt,
        timeLimit,
        area,
        level,
        timeLimitWithWaitingTime
      ) => {
        const mode = {
          gameMode,
          roomId: roomID,
          createdAt,
          timeLimit,
          area,
          level,
          timeLimitWithWaitingTime,
        };
        dispatch(setGameMode(mode));
        dispatch(newGame(quizlist));
        setCountDown(parseInt(timeLimitWithWaitingTime) - parseInt(timeLimit))
        setFetching(false);
      }
    );

    return () => socket.disconnect();
  }, [players.length, username]);

  // start the countDown after the game creator clicked on start game button
  useEffect(() => {
    if (countDown !== false) {
      const interval = setInterval(() => {
        setCountDown(countDown => countDown - 1)
      }, 1000)
      if (countDown === 0) {
        setRedirectToQuiz(true);
      }
      return () => clearInterval(interval)
    }
    
  }, [countDown])

  const startGame = () => {
    setFetching(true) // show spinner
    const socket = socketIOClient(ENDPOINT);
    //emit event with all the game settings to server to start a multiPlayer game 
    socket.emit("startGame", roomID, area, level, timeLimit);
  };

  //it copies the url of the multiplayer room to the clipboard
  const copyURL = () => {
    copy(window.location.href);
    setCopySuccess(true);
  };

  if (!username) {
    return <SetUser open={open} setOpen={setOpen} />;
  }
  // if the game data came from server and the countDown reached 0, this will redirects us to the Quiz
  if (redirectToQuiz) {
    return (
      <Redirect
        to={{
          pathname: "/quiz",
          state: { roomID },
        }}
      />
    );
  }

  //show a spinner while data is fetching
  if (fetching) {
    return (
      <div className={classes.spinner}>
        <Spinner />
      </div>
    ) 
  }

  return (
    <div>
      {/* Only the game creator can start the game. Everone see all the joined players to room */}
      {countDown === false ? (
        <div className={classes.waitingRoom}>
          <Typography variant="h3">Welcome in the waiting room!</Typography>
          <h3>
            Send this link to invite others: <span>{window.location.href}</span>
          </h3>
          <div className={classes.copyInfo}>
            <Button
              variant="contained"
              className={classes.button}
              onClick={copyURL}
            >
              Copy Link
            </Button>
            {copySuccess && <h3 className={classes.copiedText}>URL Copied</h3>}
          </div>
          <div className={classes.playersContainer}>
            {players.map((player) => (
              <h3 key={player}>{player}</h3>
            ))}
          </div>
          {players[0] === username && (
            <Button
              variant="contained"
              className={clsx(classes.button, classes.marginTop)}
              onClick={startGame}
            >
              Start Game
            </Button>
          )}
        </div>
      ) : (
        // If the players got the data from server after the host started the game, a countDown starts at everyone
        <div className={classes.countDown}>
          <div className={classes.gameInfo}>
            <Typography variant="h4">Category: {currentGameMode.area}</Typography>
            <Typography variant="h4">Level: {currentGameMode.level} / 10</Typography>
            <Typography variant="h4">Timelimit: {currentGameMode.timeLimit} s</Typography>
          </div>
          <Typography variant="h2">{countDown}</Typography>

        </div>
      )}
    </div>
  );
};

//connect to Material UI Theme Provider
export default withStyles(styles)(WaitingRoom);
