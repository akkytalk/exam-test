import * as actionType from "../actions/ActionTypes";

const initialState = {
  assesment: [],
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ASSESEMENT_SET_DATA:
      return {
        ...state,
        assesment: action.assesment,
        error: false,
      };

    case actionType.ASSESEMENT_FAIL_DATA:
      return {
        ...state,
        error: action.error,
      };

    case actionType.POST_ASSESEMENT_DATA_FAIL:
      return {
        ...state,
        error: action.error,
      };

    case actionType.EDIT_ASSESEMENT_ROW_START:
      return {
        ...state,
      };

    case actionType.UPDATE_ASSESEMENT_DATA_START:
      return {
        ...state,
      };

    case actionType.CURRENT_USER_EDIT_ASSESEMENT:
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
