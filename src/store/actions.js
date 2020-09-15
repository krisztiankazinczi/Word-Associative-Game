import {
  NEW_GAME,
  FINISH_GAME,
  ANSWER_QUESTION,
  SET_USER,
  SET_GAME_MODE,
  SAVE_EVERYONES_ANSWER,
  DELETE_DATA_FROM_STORE,
} from "./action_types";

export const newGame = (payload) => {
  //payload contains all the fetched quizQuestions
  return {
    type: NEW_GAME,
    payload,
  };
};

export const setGameMode = (payload) => {
  return {
    type: SET_GAME_MODE,
    payload,
  };
};

export const finishGame = () => {
  return {
    type: FINISH_GAME,
  };
};

export const answerQuestion = (payload) => {
  // payload is an answer to a question
  return {
    type: ANSWER_QUESTION,
    payload,
  };
};

export const saveEveryonesAnswers = (payload) => {
  //payload contains all the participants's answers in a multiPlayer room
  return {
    type: SAVE_EVERYONES_ANSWER,
    payload,
  };
};

export const setUser = (payload) => {
  // payload is the username
  return {
    type: SET_USER,
    payload,
  };
};

export const deleteDataFromStore = () => {
  return {
    type: DELETE_DATA_FROM_STORE
  }
}
