import axios from "axios";

const baseURL = process.env.REACT_APP_ENV_DEV
  ? "http://localhost:3030/api/v1"
  : `${process.env.REACT_APP_BACK_END_URL}/api/v1`;

const instance = axios.create({
  baseURL,
});

export default instance;
