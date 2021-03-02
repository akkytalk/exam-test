import * as actionType from "./ActionTypes";
import axios from "axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const majorcatsSetData = (majorcats) => {
  return {
    type: actionType.MAJORCATS_SET_DATA,
    majorcats: majorcats,
  };
};

export const majorcatsFailData = () => {
  return {
    type: actionType.MAJORCATS_FAIL_DATA,
  };
};

export const majorcatsGetData = (data) => {
  return (dispatch) => {
    console.log(data);
    axios
      .get(baseUrl + "majorCats", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,

        },
      })
      .then((res) => {
        dispatch(majorcatsSetData(res.data));

        console.log("response data", res.data);
      })
      .catch((err) => console.log(err));
    //   .catch((error) => dispatch(majorcatsFailData()));
  };
};

export const deleteMajorcatsFail = () => {
  return {
    type: actionType.DELETE_MAJORCATS_FAIL,
  };
};

export const deleteMajorcats = (data, id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `majorCats/${id}`, {
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
        .catch((error) => dispatch(deleteMajorcatsFail()));
    }
  };
};

export const postMajorcatsDataStart = () => {
  return {
    type: actionType.POST_MAJORCATS_DATA_START,
  };
};

export const postMajorcatsDataFail = () => {
  return {
    type: actionType.POST_MAJORCATS_DATA_FAIL,
  };
};

export const postMajorcatsData = (data, user) => {
  return (dispatch) => {
    if (!user.name) return;
    console.log("data postMajorcatsData", data);
    dispatch(postMajorcatsDataStart());

    axios
      .post(baseUrl + "majorCats", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data?.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Created Category!").then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(postMajorcatsDataFail());
      });
    // props.addUser(user);
    // setUser(initialFormState);
  };
};

export const editMajorcatsRowStart = () => {
  return {
    type: actionType.EDIT_MAJORCATS_ROW_START,
  };
};

export const failEditMajorcats = () => {
  return {
    type: actionType.FAIL_EDIT_MAJORCATS,
  };
};

export const editMajorcatsRow = (
  data,
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser
) => {
  return (dispatch) => {
    console.log("data editMajorcatsRow", data);
    dispatch(editMajorcatsRowStart());
    setEditing(true);
    axios
      .get(baseUrl + `majorCats/${id}`, {
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
        });
      })
      .catch((error) => dispatch(failEditMajorcats()));
  };
};

export const updateMajorcatsDataStart = () => {
  return {
    type: actionType.UPDATE_MAJORCATS_DATA_START,
  };
};

export const updateMajorcatsData = (
  data,
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser
) => {
  return (dispatch) => {
    dispatch(updateMajorcatsDataStart());
    setEditing(false);

    axios
      .put(baseUrl + `majorCats/${id}`, currentUser, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated Category!").then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
