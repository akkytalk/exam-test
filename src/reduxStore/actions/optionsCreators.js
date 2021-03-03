import * as actionType from "./ActionTypes";
import axios from "axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const optionsSetData = (options) => {
  return {
    type: actionType.OPTIONS_SET_DATA,
    options: options,
  };
};

export const optionsFailData = () => {
  return {
    type: actionType.OPTIONS_FAIL_DATA,
  };
};

export const optionsGetData = (data) => {
  return (dispatch) => {
    console.log(data);
    axios
      .get(baseUrl + "options", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(optionsSetData(res.data));

        console.log("response data", res.data);
      })
      .catch((err) => console.log(err));
    //   .catch((error) => dispatch(optionsFailData()));
  };
};

export const deleteOptionsFail = () => {
  return {
    type: actionType.DELETE_OPTIONS_FAIL,
  };
};

export const deleteOptions = (data, id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `options/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Question!").then(() => {
            window.location.reload();
          });
        })
        .catch((error) => dispatch(deleteOptionsFail()));
    }
  };
};

export const postOptionsDataStart = () => {
  return {
    type: actionType.POST_OPTIONS_DATA_START,
  };
};

export const postOptionsDataFail = () => {
  return {
    type: actionType.POST_OPTIONS_DATA_FAIL,
  };
};

export const postOptionsData = (data, user) => {
  return (dispatch) => {
    // if (!user.name) return;
    // console.log(data);
    console.log("user from postOptionsData", user);
    dispatch(postOptionsDataStart());
    axios
      .post(baseUrl + "options", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Added Options!").then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(postOptionsDataFail());
      });
    // props.addUser(user);
    // setUser(initialFormState);
  };
};

export const editOptionsRowStart = () => {
  return {
    type: actionType.EDIT_OPTIONS_ROW_START,
  };
};

export const failEditOptions = () => {
  return {
    type: actionType.FAIL_EDIT_OPTIONS,
  };
};

export const editOptionsRow = (
  data,
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser
) => {
  return (dispatch) => {
    dispatch(editOptionsRowStart());
    setEditing(true);
    axios
      .get(baseUrl + `options/${id}`, {
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
          question_id: res.data.question_id,
          question_text: res.data.question.question_text,
          option_text: res.data.option_text,
        });
      })
      .catch((error) => dispatch(failEditOptions()));
  };
};

export const updateOptionsDataStart = () => {
  return {
    type: actionType.UPDATE_OPTIONS_DATA_START,
  };
};

export const updateOptionsData = (
  data,
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser
) => {
  return (dispatch) => {
    dispatch(updateOptionsDataStart());
    setEditing(false);

    axios
      .put(baseUrl + `options/${id}`, currentUser, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated question!").then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
};
