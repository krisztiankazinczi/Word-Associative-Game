import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { StateProvider } from "./store/StateProvider";
import reducer, { initialState } from "./store/reducer";

import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const styles = {
  palette: {
    primary: {
      light: "#dd33fa",
      main: "#d500f9",
      dark: "#9500ae",
      contrastText: "#fff",
    },
    secondary: {
      light: "#70d9e7",
      main: "#4dd0e1",
      dark: "#35919d",
      contrastText: "#fff",
    },
    warning: {
      light: "#ff785b",
      main: "#ff5733",
      dark: "#b23c23",
      contrastText: "#fff",
    },
  },
  otherStyles: {
    mainBackgroundColor: {
      backgroundColor: "rgb(23,34,44)",
    },
    secondaryBackgroundColor: {
      backgroundColor: '#30445C',
    },
    secondaryBackgroundColorHovered: {
      backgroundColor: '#3c5573',
    },
    mainTextColor: {
      color: '#9BA8B5',
    },
    selectedColor: {
      backgroundColor: "#E78230",
    },
    orangeColor: {
      color: "#ff5733"
    },
    button: {
      backgroundColor: '#30445C',
      color: "#ff5733",
      cursor: "pointer",
      '&:hover': {
        background: "#3c5573",
        transition: "100ms transform ease-in",
        transform: "scale(1.08)"
     }
    }
  }
};

const theme = createMuiTheme(styles);

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <StateProvider initialState={initialState} reducer={reducer}>
        <App />
      </StateProvider>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
