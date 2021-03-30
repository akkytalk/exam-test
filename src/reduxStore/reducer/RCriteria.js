import * as actionType from "../actions/ActionTypes";

const initialState = {
  criteria: [],
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.CRITERIA_SET_DATA:
      return {
        ...state,
        criteria: action.criteria,
        error: false,
      };

    case actionType.CRITERIA_FAIL_DATA:
      return {
        ...state,
        error: action.error,
      };

    case actionType.POST_CRITERIA_DATA_FAIL:
      return {
        ...state,
        error: action.error,
      };

    case actionType.EDIT_CRITERIA_ROW_START:
      return {
        ...state,
      };

    case actionType.UPDATE_CRITERIA_DATA_START:
      return {
        ...state,
      };

    case actionType.CURRENT_USER_EDIT_CRITERIA:
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
