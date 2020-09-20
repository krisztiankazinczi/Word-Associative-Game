import axios from "axios";

const baseURL = process.env.REACT_APP_DEVELOPMENT_MODE
  ? "http://localhost:3030/api/v1"
  : `${process.env.REACT_APP_BACK_END_URL}/api/v1`;

const instance = axios.create({
  baseURL,
});

export default instance;
