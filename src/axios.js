import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:3030/api/v1",
  baseURL: "https://word-associative-game-back-end.herokuapp.com/api/v1",
});

export default instance;
