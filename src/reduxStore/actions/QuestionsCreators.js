import * as actionType from "./ActionTypes";
import axios from "axios";
import swal from "sweetalert";
import { baseUrl } from "../../shared/baseUrl";

export const questionsSetData = (questions) => {
  return {
    type: actionType.QUESTIONS_SET_DATA,
    questions: questions,
  };
};

export const questionsFailData = () => {
  return {
    type: actionType.QUESTIONS_FAIL_DATA,
  };
};

export const questionsGetData = (data) => {
  return (dispatch) => {
    console.log(data);
    axios
      .get(baseUrl + "questions", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(questionsSetData(res.data));

        console.log("response data", res.data);
      })
      .catch((err) => console.log(err));
    //   .catch((error) => dispatch(questionsFailData()));
  };
};

export const deleteQuestionsFail = () => {
  return {
    type: actionType.DELETE_QUESTIONS_FAIL,
  };
};

export const deleteQuestions = (data, id) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `questions/${id}`, {
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
        .catch((error) => dispatch(deleteQuestionsFail()));
    }
  };
};

export const postQuestionsDataStart = () => {
  return {
    type: actionType.POST_QUESTIONS_DATA_START,
  };
};

export const postQuestionsDataFail = () => {
  return {
    type: actionType.POST_QUESTIONS_DATA_FAIL,
  };
};

export const postQuestionsData = (data, user) => {
  return (dispatch) => {
    if (!user.name) return;
    // console.log(data);
    dispatch(postQuestionsDataStart());
    axios
      .post(
        baseUrl + "questions",
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
        dispatch(postQuestionsDataFail());
      });
    // props.addUser(user);
    // setUser(initialFormState);
  };
};

export const editQuestionsRowStart = () => {
  return {
    type: actionType.EDIT_QUESTIONS_ROW_START,
  };
};

export const failEditQuestions = () => {
  return {
    type: actionType.FAIL_EDIT_QUESTIONS,
  };
};

export const editQuestionsRow = (
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser,
  data
) => {
  return (dispatch) => {
    dispatch(editQuestionsRowStart());
    setEditing(true);
    axios
      .get(baseUrl + `questions/${id}`, {
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
      .catch((error) => dispatch(failEditQuestions()));
  };
};

export const updateQuestionsDataStart = () => {
  return {
    type: actionType.UPDATE_QUESTIONS_DATA_START,
  };
};

export const updateQuestionsData = (
  id,
  editing,
  setEditing,
  currentUser,
  setCurrentUser,
  data
) => {
  return (dispatch) => {
    dispatch(updateQuestionsDataStart());
    setEditing(false);

    axios
      .put(
        baseUrl + `questions/${id}`,
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
