import * as actionType from "../actions/ActionTypes";

const initialState = {
  subcats: [],
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SUBCATS_SET_DATA:
      return {
        ...state,
        subcats: action.subcats,
        error: false,
      };

    case actionType.SUBCATS_FAIL_DATA:
      return {
        ...state,
        error: true,
      };

    case actionType.POST_SUBCATS_DATA_FAIL:
      return {
        ...state,
        error: true,
      };

    case actionType.EDIT_SUBCATS_ROW_START:
      return {
        ...state,
      };

    case actionType.UPDATE_SUBCATS_DATA_START:
      return {
        ...state,
      };

    case actionType.CURRENT_USER_EDIT_SUBCATS:
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
