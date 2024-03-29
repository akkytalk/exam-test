import * as actionType from "../actions/ActionTypes";

const initialState = {
  users: [],
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.USERS_SET_DATA:
      return {
        ...state,
        users: action.users,
        error: false,
      };

    case actionType.USERS_FAIL_DATA:
      return {
        ...state,
        error: true,
      };

    case actionType.POST_USERS_DATA_FAIL:
      return {
        ...state,
        error: true,
      };

    case actionType.EDIT_USERS_ROW_START:
      return {
        ...state,
      };

    case actionType.UPDATE_USERS_DATA_START:
      return {
        ...state,
      };

    case actionType.CURRENT_USER_EDIT_USERS:
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
