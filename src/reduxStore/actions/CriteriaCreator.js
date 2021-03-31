import * as actionType from "./ActionTypes";
import axios from "axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const criteriaSetData = (criteria) => {
  return {
    type: actionType.CRITERIA_SET_DATA,
    criteria: criteria,
  };
};

export const criteriaFailData = () => {
  return {
    type: actionType.CRITERIA_FAIL_DATA,
  };
};

export const criteriaGetData = (data) => {
  return (dispatch) => {
    console.log(data);
    axios
      .get(baseUrl + "criterias", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(criteriaSetData(res.data));

        console.log("response data", res.data);
      })
      .catch((err) => console.log(err));
    //   .catch((error) => dispatch(criteriaFailData()));
  };
};

export const deleteCriteriaFail = () => {
  return {
    type: actionType.DELETE_CRITERIA_FAIL,
  };
};

export const deleteCriteria = (data, id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `criterias/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Criteria!").then(() => {
            window.location.reload();
          });
        })
        .catch((error) => dispatch(deleteCriteriaFail()));
    }
  };
};

export const postCriteriaDataStart = () => {
  return {
    type: actionType.POST_CRITERIA_DATA_START,
  };
};

export const postCriteriaDataFail = () => {
  return {
    type: actionType.POST_CRITERIA_DATA_FAIL,
  };
};

export const postCriteriaData = (data, user) => {
  return (dispatch) => {
    if (!user.name) return;
    console.log("postCriteriaData", data);
    dispatch(postCriteriaDataStart());

    axios
      .post(baseUrl + "criterias", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data?.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Created sub Category!").then(() => {
          dispatch(criteriaGetData(data));
          // window.location.reload();
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(postCriteriaDataFail());
      });
    // props.addUser(user);
    // setUser(initialFormState);
  };
};

export const editCriteriaRowStart = () => {
  return {
    type: actionType.EDIT_CRITERIA_ROW_START,
  };
};

export const failEditCriteria = () => {
  return {
    type: actionType.FAIL_EDIT_CRITERIA,
  };
};

export const editCriteriaRow = (
  data,
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser
) => {
  return (dispatch) => {
    dispatch(editCriteriaRowStart());
    setEditing(true);
    axios
      .get(baseUrl + `criterias/${id}`, {
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
          name: res.data.name,
        });
      })
      .catch((error) => dispatch(failEditCriteria()));
  };
};

export const updateCriteriaDataStart = () => {
  return {
    type: actionType.UPDATE_CRITERIA_DATA_START,
  };
};

export const updateCriteriaData = (
  data,
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser
) => {
  return (dispatch) => {
    dispatch(updateCriteriaDataStart());
    setEditing(false);

    axios
      .put(baseUrl + `criterias/${id}`, currentUser, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then(() => {
        console.log("swal");
        swal("Successfully Updated Criteria!").then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
