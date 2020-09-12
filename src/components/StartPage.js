import React, { useState } from "react";
import withStyles from '@material-ui/core/styles/withStyles';


import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { Redirect, Link } from "react-router-dom";

import SetUser from "./SetUser";

import { useStateValue } from "../store/StateProvider";


const styles = (theme) => ({
  ...theme.otherStyles,
  fullHeight: {
    minHeight: "100vh",
  },
  text: {
    color: "#ff5733"
  }
});

const StartPage = ({ classes }) => {
  const [open, setOpen] = useState(false);
  const [{ username }] = useStateValue();

  //This page has only one purpose, to select a username

  // user must set a username, if it's already done, then redirect happens automatically
  const startGame = () => {
    setOpen(true);
  };

  // if username is not falsy in the store, the player will be redirected to the new Game page
  if (username) {
    return <Redirect to="/newGame" />;
  }

  // open a dialog to select a username
  if (open) {
    return <SetUser open={open} setOpen={setOpen} />;
  }

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      className={`${classes.mainBackgroundColor} ${classes.fullHeight}`}
    >
      <Grid item xs={3}>
        <Button
          size="large"
          className={`${classes.secondaryBackgroundColor} ${classes.button}`}
          variant="contained"
        >
          <Typography
            className={classes.text}
            variant="h5"
            onClick={startGame}
          >
            New Game
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(StartPage);
