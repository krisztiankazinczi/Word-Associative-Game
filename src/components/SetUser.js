import React, { useState } from "react";
import withStyles from '@material-ui/core/styles/withStyles';


import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Input from "@material-ui/core/Input";

import { useStateValue } from "../store/StateProvider";
import { setUser } from "../store/actions";

const styles = (theme) => ({
  ...theme.otherStyles,
  dialog: {
    backgroundColor: '#2F4459',
  },
  dialogActions: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#30445C',
    color: '#9BA8B5',
    overflow: 'hidden'
  },
  inputContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#2F4459',
  },
  center: {
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  marginTop: {
    marginTop: '20px;'
  },
  textColor: {
    color: "#9BA8B5"
  }
});

const SetUser = ({ open, setOpen, classes }) => {
  const [userName, setUserName] = useState("");
  const [{username}, dispatch] = useStateValue();

  if (username) {
    setOpen(false)
  }

  const saveName = () => {
    dispatch(setUser(userName));
    setOpen(false)
  };

  const handleSubmit = (e) => {
    if (e.key === 'Enter') {
      dispatch(setUser(userName));
      setOpen(false)
    }
  }

  return (
    <Dialog className={classes.dialog} open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <DialogTitle className={classes.dialogActions}>Please select your username:</DialogTitle>
      <DialogActions className={classes.dialogActions}>
        <div className={classes.inputContainer}>
          <Input className={`${classes.center} ${classes.textColor}`} fullWidth color="secondary" type="text" value={userName} onKeyDown={(e) => handleSubmit(e)} onChange={(e) => setUserName(e.target.value)} />
        </div>
        <div className={`${classes.inputContainer} ${classes.marginTop}`}>
          <Button className={classes.center} onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button className={classes.center} onClick={saveName} color="secondary">
            Save
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles)(SetUser);
