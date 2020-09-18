import {
  NEW_GAME,
  FINISH_GAME,
  ANSWER_QUESTION,
  SET_USER,
  SET_GAME_MODE,
  SAVE_EVERYONES_ANSWER,
  DELETE_DATA_FROM_STORE,
} from "./action_types";

export const initialState = {
  username: "",
  quiz: {
    quizQuestions: null,
    playersAnswers: null
  },
  currentQuestion: 0,
  currentGameMode: {
    gameMode: '',
    roomId: '',
    createdAt: '',
    timeLimit: null,
    area: '',
    level: '',
    timeLimitWithWaitingTime: ''
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, username: action.payload };

    case NEW_GAME:
      return {
        ...state,
        quiz: { ...state.quiz, quizQuestions: action.payload },
      };

    case SET_GAME_MODE:
      return { ...state, currentGameMode: action.payload };

    case FINISH_GAME:
      return { ...state, quiz: null };

    case ANSWER_QUESTION:
      console.log(state.quiz.quizQuestions)
      return {
        ...state,
        currentQuestion:
          state.currentQuestion === 9
            ? state.currentQuestion
            : state.currentQuestion + 1,
        quiz: {
          ...state.quiz,
          quizQuestions: [
            ...state.quiz.quizQuestions.slice(0, action.payload.questionNumber),
            Object.assign(
              {},
              state.quiz.quizQuestions[action.payload.questionNumber],
              {
                answer: action.payload.answer,
              }
            ),
            ...state.quiz.quizQuestions.slice(
              action.payload.questionNumber + 1
            ),
          ],
        },
      };

    case SAVE_EVERYONES_ANSWER:
      return {
        ...state,
        quiz: { ...state.quiz, playersAnswers: action.payload },
      };

    case DELETE_DATA_FROM_STORE:
      return {
        ...state,
        quiz: {
          quizQuestions: null,
          playersAnswers: null
        },
        currentQuestion: 0,
        currentGameMode: {
          gameMode: '',
          roomId: '',
          createdAt: '',
          timeLimit: null,
          area: '',
          level: '',
          timeLimitWithWaitingTime: ''
        }
      }

    default:
      return state;
  }
};

export default reducer;
