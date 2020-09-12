import React, { useState } from "react";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { Redirect, Link } from "react-router-dom";

import SetUser from './SetUser';

import { useStateValue } from "../store/StateProvider";

const StartPage = () => {
  const [open, setOpen] = useState(false);
  const [{username}] = useStateValue();


  const startGame = () => {
    setOpen(true)
  }

  if (username) {
      return <Redirect to="/newGame" />;
  }

  // open a dialog 
  if (open) {
    return (
      <SetUser open={open} setOpen={setOpen} />
    );
  }

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh", backgroundColor: "#511845"}}
    >
      <Grid item xs={3}>
        {/* <Link to="/newGame"> */}
          <Button size="large" style={{ backgroundColor: "#900c3f" }} variant="contained">
              <Typography style={{ color: "#ff5733" }} variant="h5" onClick={startGame}>New Game</Typography>
          </Button>
        {/* </Link> */}
        
      </Grid>
    </Grid>
  );
};

export default StartPage;
