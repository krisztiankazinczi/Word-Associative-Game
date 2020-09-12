import React from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import StartPage from "./components/StartPage";
import NewGame from "./components/NewGame";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import WaitingRoom from './components/WaitingRoom';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={StartPage} />
        <Route exact path="/room/:roomID" component={WaitingRoom} />
        <Route path="/newGame" component={NewGame} />
        <Route path="/quiz" component={Quiz} />
        <Route path="/result" component={Result} />
      </Switch>
    </Router>
  );
};

export default App;
