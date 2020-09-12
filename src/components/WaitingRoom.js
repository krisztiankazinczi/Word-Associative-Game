import React, {useState, useEffect} from 'react'
import { Redirect } from "react-router-dom";

import './WaitingRoom.css'

import SetUser from './SetUser';

import socketIOClient from "socket.io-client";
import { useStateValue } from '../store/StateProvider';

import { newGame } from "../store/actions";

const ENDPOINT = "http://localhost:3030";

const url = "http://localhost:3000/room/"

function WaitingRoom(props) {
  // const [myId, setMyId] = useState(Math.floor(Math.random() * 1000000000000000))
  // const [players, setPlayers] = useState([myId]);
  const [{username}, dispatch] = useStateValue();
  const [players, setPlayers] = useState([username]);
  const [open, setOpen] = useState(true); // dialog if user has no username in the store
  const [redirectToQuiz, setRedirectToQuiz] = useState(false);

  //These came with Redirect props, but only for the room creator!!!
  const area = props.location.state?.area
  const level = props.location.state?.level
  
  useEffect(() => {
    if (!username) return;

    const socket = socketIOClient(ENDPOINT);
    // socket.emit('join-room', props.match.params.roomID, myId);
    socket.emit('join-room', props.match.params.roomID, username);

    socket.on('user-connected', (userIds) => {
      setPlayers(userIds);
    })

    socket.on("quiz-list", (quizlist) => {
      dispatch(newGame(quizlist));
      setRedirectToQuiz(true);
    })

    return () => socket.disconnect();

  }, [players.length, username]);

  const startGame = () => {
    const socket = socketIOClient(ENDPOINT);
    socket.emit('startGame', props.match.params.roomID, area, level)
  }

  if (!username) {
    return (
      <SetUser open={open} setOpen={setOpen} />
    );
  }


  if (redirectToQuiz) {
    return (
      <Redirect
        to={{
          pathname: "/quiz",
        }}
      />
    );
  }

  return (
    <div className="waitingRoom">
      welcome in the waiting room
      <br></br>
      please send this link to invite others: {`${url}${props.match.params.roomID}`}<br />
      {
        players.map(player => (
          <h2 key={player}>{player}</h2>
        ))
      }

      {
        // players[0] === myId && ( <button onClick={startGame}>Start Game</button> )
        players[0] === username && ( <button onClick={startGame}>Start Game</button> )
      }
      
    </div>
  )
}

export default WaitingRoom
