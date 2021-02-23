import * as actionType from "../actions/ActionTypes";

const initialState = {
  markings: [],
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.MARKINGS_SET_DATA:
      return {
        ...state,
        markings: action.markings,
        error: false,
      };

    case actionType.MARKINGS_FAIL_DATA:
      return {
        ...state,
        error: true,
      };

    case actionType.POST_MARKINGS_DATA_FAIL:
      return {
        ...state,
        error: true,
      };

    case actionType.EDIT_MARKINGS_ROW_START:
      return {
        ...state,
      };

    case actionType.UPDATE_MARKINGS_DATA_START:
      return {
        ...state,
      };

    case actionType.CURRENT_USER_EDIT_MARKINGS:
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
