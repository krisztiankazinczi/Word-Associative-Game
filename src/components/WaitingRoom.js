import React, { useState, useEffect } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import copy from "copy-to-clipboard";
import clsx from 'clsx';

import { Redirect } from "react-router-dom";

import SetUser from "./SetUser";

import socketIOClient from "socket.io-client";
import { useStateValue } from "../store/StateProvider";

import { newGame, setGameMode } from "../store/actions";
import { Typography } from "@material-ui/core";

const ENDPOINT = "http://localhost:3030";

const url = "http://localhost:3000/room/";

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
    width: '60%',
    marginTop: '30px',
    '& > h3': {
      width: '80%',
      color: theme.otherStyles.orangeColor.color,
      marginLeft: '10%',
      fontSize: '25px',
      borderBottom: `1px solid ${theme.otherStyles.orangeColor.color}`
    }
  },
  marginTop: {
    marginTop: '30px'
  }
});

const WaitingRoom = ({
  classes,
  match: {
    params: { roomID },
  },
  ...props
}) => {
  const [{ username }, dispatch] = useStateValue();
  const [players, setPlayers] = useState([username]);
  const [open, setOpen] = useState(true); // dialog if user has no username in the store
  const [redirectToQuiz, setRedirectToQuiz] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  //These came with Redirect props, but only for the room creator!!!
  const area = props.location.state?.area;
  const level = props.location.state?.level;

  useEffect(() => {
    if (!username) return;

    const socket = socketIOClient(ENDPOINT);
    socket.emit("join-room", roomID, username);

    socket.on("user-connected", (users) => {
      const usernames = Object.keys(users)
      setPlayers(usernames);
    });

    socket.on("quiz-list", (quizlist, gameMode) => {
      const mode = {
        gameMode,
        roomId: roomID
      }
      dispatch(setGameMode(mode));
      dispatch(newGame(quizlist));
      setRedirectToQuiz(true);
    });

    return () => socket.disconnect();
  }, [players.length, username]);

  const startGame = () => {
    const socket = socketIOClient(ENDPOINT);
    socket.emit("startGame", roomID, area, level);
  };

  const copyURL = () => {
    copy(`${url}${roomID}`);
    setCopySuccess(true);
  };

  if (!username) {
    return <SetUser open={open} setOpen={setOpen} />;
  }

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

  return (
    <div className={classes.waitingRoom}>
      <Typography variant="h3">Welcome in the waiting room!</Typography>
      <h3>
        Send this link to invite others: <span>{`${url}${roomID}`}</span>
      </h3>
      <div className={classes.copyInfo}>
        <button className={classes.button} onClick={copyURL}>
          Copy Link to Clipboard
        </button>
        {copySuccess && <h3 className={classes.copiedText}>URL Copied</h3>}
      </div>
      <div className={classes.playersContainer}>
        {players.map((player) => (
          <h3 key={player}>{player}</h3>
        ))}
      </div>
      {players[0] === username && (
        <button className={clsx(classes.button, classes.marginTop)} onClick={startGame}>
          Start Game
        </button>
      )}
    </div>
  );
};

export default withStyles(styles)(WaitingRoom);
