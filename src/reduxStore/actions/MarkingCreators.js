import * as actionType from "./ActionTypes";
import axios from "axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const markingsSetData = (markings) => {
  return {
    type: actionType.MARKINGS_SET_DATA,
    markings: markings,
  };
};

export const markingsFailData = () => {
  return {
    type: actionType.MARKINGS_FAIL_DATA,
  };
};

export const markingsGetData = (data) => {
  return (dispatch) => {
    console.log(data);
    axios
      .get(baseUrl + "marks", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(markingsSetData(res.data));

        console.log("response data", res.data);
      })
      .catch((err) => console.log(err));
    //   .catch((error) => dispatch(MarkingsFailData()));
  };
};

export const deleteMarkingsFail = () => {
  return {
    type: actionType.DELETE_MARKINGS_FAIL,
  };
};

export const deleteMarkings = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `marks/${id}`, {
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
        .catch((error) => dispatch(deleteMarkingsFail()));
    }
  };
};

export const postMarkingsDataStart = () => {
  return {
    type: actionType.POST_MARKINGS_DATA_START,
  };
};

export const postMarkingsDataFail = () => {
  return {
    type: actionType.POST_MARKINGS_DATA_FAIL,
  };
};

export const postMarkingsData = (user, data) => {
  return (dispatch) => {
    if (!user.name) return;
    // console.log(data);
    dispatch(postMarkingsDataStart());
    axios
      .post(
        baseUrl + "marks",
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
        dispatch(postMarkingsDataFail());
      });
    // props.addUser(user);
    // setUser(initialFormState);
  };
};

export const editMarkingsRowStart = () => {
  return {
    type: actionType.EDIT_MARKINGS_ROW_START,
  };
};

export const failEditMarkings = () => {
  return {
    type: actionType.FAIL_EDIT_MARKINGS,
  };
};

export const editMarkingsRow = (
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser,
  data
) => {
  return (dispatch) => {
    dispatch(editMarkingsRowStart());
    setEditing(true);
    axios
      .get(baseUrl + `marks/${id}`, {
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
      .catch((error) => dispatch(failEditMarkings()));
  };
};

export const updateMarkingsDataStart = () => {
  return {
    type: actionType.UPDATE_MARKINGS_DATA_START,
  };
};

export const updateMarkingsData = (
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser,
  data
) => {
  return (dispatch) => {
    dispatch(updateMarkingsDataStart());
    setEditing(false);

    axios
      .put(
        baseUrl + `marks/${id}`,
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
