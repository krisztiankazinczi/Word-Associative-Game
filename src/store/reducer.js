import { NEW_GAME, FINISH_GAME, ANSWER_QUESTION, SET_USER } from "./action_types";

export const initialState = {
  username: '',
  quizQuestions: null,
  currentQuestion: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, username: action.payload}

    case NEW_GAME:
      return { ...state, quizQuestions: action.payload };

    case FINISH_GAME:
      return { ...state, quizQuestions: null };

    case ANSWER_QUESTION:
      return {
        ...state,
        currentQuestion: state.currentQuestion === 9 ? state.currentQuestion : (state.currentQuestion + 1),
        quizQuestions: [
          ...state.quizQuestions.slice(0, action.payload.questionNumber),
          Object.assign(
            {},
            state.quizQuestions[action.payload.questionNumber],
            {
              answer: action.payload.answer,
            }
          ),
          ...state.quizQuestions.slice(action.payload.questionNumber + 1),
        ],
      };

    default:
      return state;
  }
};

export default reducer;
