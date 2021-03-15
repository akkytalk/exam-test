import * as actionType from "../actions/ActionTypes";

const initialState = {
  options: [],
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.OPTIONS_SET_DATA:
      return {
        ...state,
        options: action.options,
        error: false,
      };

    case actionType.OPTIONS_FAIL_DATA:
      return {
        ...state,
        error: action.error,
      };

    case actionType.POST_OPTIONS_DATA_FAIL:
      return {
        ...state,
        error: action.error,
      };

    case actionType.EDIT_OPTIONS_ROW_START:
      return {
        ...state,
      };

    case actionType.UPDATE_OPTIONS_DATA_START:
      return {
        ...state,
      };

    case actionType.CURRENT_USER_EDIT_OPTIONS:
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
