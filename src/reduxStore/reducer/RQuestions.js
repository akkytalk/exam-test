import * as actionType from "../actions/ActionTypes";

const initialState = {
  questions: [],
  isLoading: false,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.QUESTIONS_SET_DATA:
      return {
        ...state,
        questions: action.questions,
        error: false,
        isLoading: false,
      };

    case actionType.QUESTIONS_FAIL_DATA:
      return {
        ...state,
        error: action.payload,
      };

    case actionType.POST_QUESTIONS_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case actionType.EDIT_QUESTIONS_ROW_START:
      return {
        ...state,
      };

    case actionType.UPDATE_QUESTIONS_DATA_START:
      return {
        ...state,
      };

    case actionType.CURRENT_USER_EDIT_QUESTIONS:
      return {
        ...state,
        editing: true,
        currentUser: [
          {
            id: action.id,
            name: action.name,
          },
        ],
      };
    default:
      return state;
  }
};

export default reducer;
