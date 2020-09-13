import { NEW_GAME, FINISH_GAME, ANSWER_QUESTION, SET_USER, SET_GAME_MODE, SAVE_EVERYONES_ANSWER } from "./action_types";

export const initialState = {
  username: '',
  quiz: null,
  currentQuestion: 0,
  currentGameMode: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, username: action.payload}

    case NEW_GAME:
      return { ...state, quiz: {...state.quiz, quizQuestions: action.payload}};

    case SET_GAME_MODE:
      return { ...state, currentGameMode: action.payload }

    case FINISH_GAME:
      return { ...state, quiz: null };

    case ANSWER_QUESTION:
      return {
        ...state,
        currentQuestion: state.currentQuestion === 9 ? state.currentQuestion : (state.currentQuestion + 1),
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
            ...state.quiz.quizQuestions.slice(action.payload.questionNumber + 1),
          ],
        }
        
      };

      case SAVE_EVERYONES_ANSWER:
        return {
          ...state,

        }

    default:
      return state;
  }
};

export default reducer;
