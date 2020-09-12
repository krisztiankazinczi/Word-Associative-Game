const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const cors = require('cors')
const fetch = require('node-fetch');

const clientURL = 'http://localhost:3000'

const port = 3030;

const corsOptions = {
  origin: clientURL
}

app.get("/getRoomID", cors(corsOptions), (req, res) => {
  res.json(uuidv4());
});


const games = {}


io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    //this connects the user to the room
    socket.join(roomId);
    // this just emit a new event: user-connected
    if (!games[roomId]) {
      games[roomId] = [userId]
    } else {
      if (!games[roomId].includes(userId)) {
        games[roomId].push(userId)
      }
    }
    socket.to(roomId).broadcast.emit('user-connected', games[roomId]);
  });

  socket.on("startGame", async (roomId, area, level) => {
    const data = await getQuizQuestions(area, level)
    socket.to(roomId).broadcast.emit("quiz-list", data.quizlist)
    
  })

  socket.on("disconnect", () => {

  })


});


server.listen(port)



const getQuizQuestions = async (area, level) => {
  const response = await fetch(
      `https://twinword-word-association-quiz.p.rapidapi.com/type1/?area=ielts&level=8`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "twinword-word-association-quiz.p.rapidapi.com",
          "x-rapidapi-key":
            "5e1990fcb7msh1cd4491b7cf3c1ap17a83fjsn4f69b58c7396",
        },
      }
    )
  const data = await response.json();
  
  return data;
}

