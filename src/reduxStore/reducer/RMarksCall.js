import * as actionType from "../actions/ActionTypes";

const initialState = {
  markscall: [],
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.MARKSCALL_SET_DATA:
      return {
        ...state,
        markscall: action.markscall,
        error: false,
      };

    case actionType.MARKSCALL_FAIL_DATA:
      return {
        ...state,
        error: action.error,
      };

    case actionType.POST_MARKSCALL_DATA_FAIL:
      return {
        ...state,
        error: action.error,
      };

    case actionType.EDIT_MARKSCALL_ROW_START:
      return {
        ...state,
      };

    case actionType.UPDATE_MARKSCALL_DATA_START:
      return {
        ...state,
      };

    case actionType.CURRENT_USER_EDIT_MARKSCALL:
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
