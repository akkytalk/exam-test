import * as actionType from "./ActionTypes";
import axios from "axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const usersSetData = (userstest) => {
  return {
    type: actionType.USERS_SET_DATA,
    userstest: userstest,
  };
};

export const usersFailData = () => {
  return {
    type: actionType.USERS_FAIL_DATA,
  };
};

export const usersGetData = (data, userstest, setUserTest) => {
  return (dispatch) => {
    console.log(data);
    axios
      .get(baseUrl + "users", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        usersSetData(res.data);
        setUserTest(res.data);
        console.log("response data", res.data);
      })
      .catch((err) => console.log(err));
    //   .catch((error) => dispatch(usersFailData()));
  };
};

export const deleteUsersFail = () => {
  return {
    type: actionType.DELETE_USERS_FAIL,
  };
};

export const deleteUsers = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `users/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Account Group!").then(() => {
            window.location.reload();
          });
        })
        .catch((error) => dispatch(deleteUsersFail()));
    }
  };
};

export const postUsersDataStart = () => {
  return {
    type: actionType.POST_USERS_DATA_START,
  };
};

export const postUsersDataFail = () => {
  return {
    type: actionType.POST_USERS_DATA_FAIL,
  };
};

export const postUsersData = (user, data) => {
  return (dispatch) => {
    if (!user.name) return;
    // console.log(data);
    dispatch(postUsersDataStart());
    axios
      .post(
        baseUrl + "users",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data.token,
          },
        },
        user
      )
      .then(() => {
        console.log("swal");
        swal("Successfully Created user!").then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(postUsersDataFail());
      });
    // props.addUser(user);
    // setUser(initialFormState);
  };
};

export const editUsersRowStart = () => {
  return {
    type: actionType.EDIT_USERS_ROW_START,
  };
};

export const failEditUsers = () => {
  return {
    type: actionType.FAIL_EDIT_USERS,
  };
};

export const editUsersRow = (
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser,
  data
) => {
  return (dispatch) => {
    dispatch(editUsersRowStart());
    setEditing(true);
    axios
      .get(baseUrl + `users/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "editing data res");
        setEditing(res.data);
        setCurrentUser({
          id: res.data.id,
          name: res.data.name,
          password: res.data.password,
        });
      })
      .catch((error) => dispatch(failEditUsers()));
  };
};

export const updateUsersDataStart = () => {
  return {
    type: actionType.UPDATE_USERS_DATA_START,
  };
};

export const updateUsersData = (
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser,
  data
) => {
  return (dispatch) => {
    dispatch(updateUsersDataStart());
    setEditing(false);

    axios
      .put(
        baseUrl + `users/${id}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data.token,
          },
        },
        currentUser
      )
      .then(() => {
        console.log("swal");
        swal("Successfully Updated User!").then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
