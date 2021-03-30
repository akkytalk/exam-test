import * as actionType from "./ActionTypes";
import axios from "axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const assesmentSetData = (assesment) => {
  return {
    type: actionType.ASSESEMENT_SET_DATA,
    assesment: assesment,
  };
};

export const assesmentFailData = (error) => {
  return {
    type: actionType.ASSESEMENT_FAIL_DATA,
    error: error,
  };
};

export const assesmentGetData = (data) => {
  return (dispatch) => {
    console.log(data);
    axios
      .get(baseUrl + "assesements", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(assesmentSetData(res.data));

        console.log("response data", res.data);
      })
      .catch((err) => console.log(err));
    //   .catch((error) => dispatch(assesmentFailData()));
  };
};

export const deleteAssesmentFail = (error) => {
  return {
    type: actionType.DELETE_ASSESEMENT_FAIL,
    error: error,
  };
};

export const deleteAssesment = (data, id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `assesements/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Assesement!").then(() => {
            window.location.reload();
          });
        })
        .catch((error) => dispatch(deleteAssesmentFail(error)));
    }
  };
};

export const postAssesmentDataStart = () => {
  return {
    type: actionType.POST_ASSESEMENT_DATA_START,
  };
};

export const postAssesmentDataFail = (error) => {
  return {
    type: actionType.POST_ASSESEMENT_DATA_FAIL,
    error: error,
  };
};

export const postAssesmentData = (data, user) => {
  return (dispatch) => {
    if (!user.name) return;
    console.log("data postAssesmentData", data);
    dispatch(postAssesmentDataStart());

    axios
      .post(baseUrl + "assesements", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data?.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Created Assesement!").then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(postAssesmentDataFail(error));
      });
    // props.addUser(user);
    // setUser(initialFormState);
  };
};

export const editAssesmentRowStart = () => {
  return {
    type: actionType.EDIT_ASSESEMENT_ROW_START,
  };
};

export const failEditAssesment = (error) => {
  return {
    type: actionType.FAIL_EDIT_ASSESEMENT,
    error: error,
  };
};

export const editAssesmentRow = (
  data,
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser
) => {
  return (dispatch) => {
    console.log("data editAssesmentRow", data);
    dispatch(editAssesmentRowStart());
    setEditing(true);
    axios
      .get(baseUrl + `assesements/${id}`, {
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
      .catch((error) => dispatch(failEditAssesment(error)));
  };
};

export const updateAssesmentDataStart = () => {
  return {
    type: actionType.UPDATE_ASSESEMENT_DATA_START,
  };
};

export const updateAssesmentData = (
  data,
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser
) => {
  return (dispatch) => {
    dispatch(updateAssesmentDataStart());
    setEditing(false);

    axios
      .put(baseUrl + `assesements/${id}`, currentUser, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated Assesement!").then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
