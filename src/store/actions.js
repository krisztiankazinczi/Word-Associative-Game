import { NEW_GAME, FINISH_GAME, ANSWER_QUESTION, SET_USER } from "./action_types"

export const newGame = (payload) => {
  //payload contains all the fetched quizQuestions
  return {
    type: NEW_GAME,
    payload
  }
}

export const finishGame = () => {
  return {
    type: FINISH_GAME
  }
}

export const answerQuestion = (payload) => {
  // payload is an answer to a question
  return {
    type: ANSWER_QUESTION,
    payload
  }
}

export const setUser = (payload) => {
  // payload is the username
  return {
    type: SET_USER,
    payload
  }
}

