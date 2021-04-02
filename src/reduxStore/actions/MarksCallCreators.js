import * as actionType from "./ActionTypes";
import axios from "axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const markscallSetData = (markscall) => {
  return {
    type: actionType.MARKSCALL_SET_DATA,
    markscall: markscall,
  };
};

export const markscallFailData = (error) => {
  return {
    type: actionType.MARKSCALL_FAIL_DATA,
    error: error,
  };
};

export const markscallGetData = (data) => {
  return (dispatch) => {
    console.log(data);
    axios
      .get(baseUrl + "criteriaMarks", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(markscallSetData(res.data));

        console.log("response data", res.data);
      })
      .catch((err) => console.log(err));
    //   .catch((error) => dispatch(markscallFailData()));
  };
};

export const deleteMarkscallFail = (error) => {
  return {
    type: actionType.DELETE_MARKSCALL_FAIL,
    error: error,
  };
};

export const deleteMarkscall = (data, id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `criteriaMarks/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Criteria Marks!").then(() => {
            //window.location.reload();
            dispatch(markscallGetData(data));
          });
        })
        .catch((error) => dispatch(deleteMarkscallFail(error)));
    }
  };
};

export const postMarkscallDataStart = () => {
  return {
    type: actionType.POST_MARKSCALL_DATA_START,
  };
};

export const postMarkscallDataFail = (error) => {
  return {
    type: actionType.POST_MARKSCALL_DATA_FAIL,
    error: error,
  };
};

export const postMarkscallData = (data, user) => {
  return (dispatch) => {
    if (!user.marks) return;
    console.log("data postMarkscallData", data);
    dispatch(postMarkscallDataStart());

    axios
      .post(baseUrl + "criteriaMarks", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data?.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Created Criteria Marks!").then(() => {
          dispatch(markscallGetData(data));
          // window.location.reload();
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(postMarkscallDataFail(error));
      });
    // props.addUser(user);
    // setUser(initialFormState);
  };
};

export const editMarkscallRowStart = () => {
  return {
    type: actionType.EDIT_MARKSCALL_ROW_START,
  };
};

export const failEditMarkscall = (error) => {
  return {
    type: actionType.FAIL_EDIT_MARKSCALL,
    error: error,
  };
};

export const editMarkscallRow = (
  data,
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser
) => {
  return (dispatch) => {
    console.log("data editMarkscallRow", data);
    dispatch(editMarkscallRowStart());
    setEditing(true);
    axios
      .get(baseUrl + `criteriaMarks/${id}`, {
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
          assesement_id: res.data.assesement_id,
          asses_name: res.data.assesement.name,
          date: res.data.date,
          criteria_id: res.data.criteria_id,
          criteria_name: res.data.criteria.name,
          user_id: res.data.user_id,
          user_name: res.data.user.name,
          marks: res.data.marks,
        });
      })
      .catch((error) => dispatch(failEditMarkscall(error)));
  };
};

export const updateMarkscallDataStart = () => {
  return {
    type: actionType.UPDATE_MARKSCALL_DATA_START,
  };
};

export const updateMarkscallData = (
  data,
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser
) => {
  return (dispatch) => {
    dispatch(updateMarkscallDataStart());
    setEditing(false);

    axios
      .put(baseUrl + `criteriaMarks/${id}`, currentUser, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated Criteria Marks!").then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
