import * as actionType from "./ActionTypes";
import axios from "axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const usersSetData = (users) => {
  return {
    type: actionType.USERS_SET_DATA,
    users: users,
  };
};

export const usersFailData = () => {
  return {
    type: actionType.USERS_FAIL_DATA,
  };
};

export const usersGetData = (data) => {
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
        dispatch(usersSetData(res.data));

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

export const deleteUsers = (data, id) => {
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
          swal("Successfully Deleted Category!").then(() => {
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

export const postUsersData = (data, user) => {
  return (dispatch) => {
    if (!user.name) return;
    console.log("data postUsersData", data);
    dispatch(postUsersDataStart());

    axios
      .post(baseUrl + "users", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data?.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Added User!").then(() => {
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
  data,
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser
) => {
  return (dispatch) => {
    console.log("data editUsersRow", data);
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
          id: res.data.data.id,
          name: res.data.data.name,
          email: res.data.data.email,
          password: res.data.data.password,
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
  data,
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser
) => {
  return (dispatch) => {
    dispatch(updateUsersDataStart());
    setEditing(false);

    axios
      .put(baseUrl + `users/${id}`, currentUser, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated user!").then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
