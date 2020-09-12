const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const cors = require("cors");
const fetch = require("node-fetch");
const dotenv = require("dotenv");

const clientURL = "http://localhost:3000/newGame";

const port = 3030;

const corsOptions = {
  origin: clientURL,
};

app.use(cors());

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

//API ROUTES

app.post("/api/v1/newSingleGame", async (req, res) => {
  const { area, level } = req.body;

  const data = await getQuizQuestions(area, level)
  res.status(200).json({ quizlist: data.quizlist})

});

// app.get("/api/v1/getRoomID", cors(corsOptions), (req, res) => {
//   res.json(uuidv4());
// });

app.get("/api/v1/getRoomID", (req, res) => {
  res.json(uuidv4());
});

// SOCKET CONNECTIONS

const games = {};

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    //this connects the user to the room
    socket.join(roomId);
    // this just emit a new event: user-connected
    if (!games[roomId]) {
      games[roomId] = [userId];
    } else {
      if (!games[roomId].includes(userId)) {
        games[roomId].push(userId);
      }
    }
    socket.to(roomId).broadcast.emit("user-connected", games[roomId]);
  });

  socket.on("startGame", async (roomId, area, level) => {
    const data = await getQuizQuestions(area, level);
    socket.to(roomId).broadcast.emit("quiz-list", data.quizlist);
  });

  socket.on("disconnect", () => {});
});

server.listen(port);


// HELPER FUNCTIONS
const getQuizQuestions = async (area, level) => {
  dotenv.config({ path: "./config.env" });


  let API_URL;

  API_URL = process.env.API_URL.replace("<area>", area);

  API_URL = process.env.API_URL.replace("<level>", level);

  const response = await fetch(
    API_URL,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": process.env.X_RAPIDAPI_HOST,
        "x-rapidapi-key": process.env.X_RAPIDAPI_KEY
      },
    }
  );
  const data = await response.json();

  return data;
};
