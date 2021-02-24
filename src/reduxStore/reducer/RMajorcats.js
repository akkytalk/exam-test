import * as actionType from "../actions/ActionTypes";

const initialState = {
  majorcats: [],
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.MAJORCATS_SET_DATA:
      return {
        ...state,
        majorcats: action.majorcats,
        error: false,
      };

    case actionType.MAJORCATS_FAIL_DATA:
      return {
        ...state,
        error: true,
      };

    case actionType.POST_MAJORCATS_DATA_FAIL:
      return {
        ...state,
        error: true,
      };

    case actionType.EDIT_MAJORCATS_ROW_START:
      return {
        ...state,
      };

    case actionType.UPDATE_MAJORCATS_DATA_START:
      return {
        ...state,
      };

    case actionType.CURRENT_USER_EDIT_MAJORCATS:
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
