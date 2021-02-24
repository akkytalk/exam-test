import * as actionType from "./ActionTypes";
import axios from "axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const subcatsSetData = (subcats) => {
  return {
    type: actionType.SUBCATS_SET_DATA,
    subcats: subcats,
  };
};

export const subcatsFailData = () => {
  return {
    type: actionType.SUBCATS_FAIL_DATA,
  };
};

export const subcatsGetData = (data) => {
  return (dispatch) => {
    console.log(data);
    axios
      .get(baseUrl + "subCats", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(subcatsSetData(res.data));

        console.log("response data", res.data);
      })
      .catch((err) => console.log(err));
    //   .catch((error) => dispatch(subcatsFailData()));
  };
};

export const deleteSubcatsFail = () => {
  return {
    type: actionType.DELETE_SUBCATS_FAIL,
  };
};

export const deleteSubcats = (data, id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `subCats/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Sub Category!").then(() => {
            window.location.reload();
          });
        })
        .catch((error) => dispatch(deleteSubcatsFail()));
    }
  };
};

export const postSubcatsDataStart = () => {
  return {
    type: actionType.POST_SUBCATS_DATA_START,
  };
};

export const postSubcatsDataFail = () => {
  return {
    type: actionType.POST_SUBCATS_DATA_FAIL,
  };
};

export const postSubcatsData = (data, user) => {
  return (dispatch) => {
    if (!user.name) return;
    console.log("postSubcatsData", data);
    dispatch(postSubcatsDataStart());

    const myheaders = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data?.token,
    };
    axios
      .post(baseUrl + "subCats", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data?.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Created sub Category!").then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(postSubcatsDataFail());
      });
    // props.addUser(user);
    // setUser(initialFormState);
  };
};

export const editSubcatsRowStart = () => {
  return {
    type: actionType.EDIT_SUBCATS_ROW_START,
  };
};

export const failEditSubcats = () => {
  return {
    type: actionType.FAIL_EDIT_SUBCATS,
  };
};

export const editSubcatsRow = (
  data,
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser
) => {
  return (dispatch) => {
    dispatch(editSubcatsRowStart());
    setEditing(true);
    axios
      .get(baseUrl + `subCats/${id}`, {
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
          major_cat_id: res.data.major_cat_id,
          major_cat_name: res.data.major_category.name,
          name: res.data.name,
        });
      })
      .catch((error) => dispatch(failEditSubcats()));
  };
};

export const updateSubcatsDataStart = () => {
  return {
    type: actionType.UPDATE_SUBCATS_DATA_START,
  };
};

export const updateSubcatsData = (
  data,
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser
) => {
  return (dispatch) => {
    dispatch(updateSubcatsDataStart());
    setEditing(false);

    axios
      .put(baseUrl + `subCats/${id}`, currentUser, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated Sub Category!").then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
