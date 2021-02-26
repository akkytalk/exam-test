/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Card, CardHeader, Form, Button } from "reactstrap";
import { removeLogin } from "../reduxStore/actions/LoginCreators";
import { withRouter } from "react-router-dom";

import "./Home.css";
import axios from "axios";
import { baseUrl } from "../shared/baseUrl";
import { Formik } from "formik";
import Question from "./Questions/Question";

function Home(props) {
  const accessToken = `${props.login?.login?.data?.token}`;

  let data = {
    token: accessToken,
  };

  console.log("data", data);

  const authAxios = axios.create({
    baseURL: baseUrl,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const [redirect, setRedirect] = useState(false);
  const [question, setQuestion] = useState([]);
  const [option, setOption] = useState([]);
  const [category, setCategory] = useState([]);
  const [user, setUser] = useState([]);

  const [page, setPage] = useState(0);
  const [counter, setCounter] = useState(10);

  useEffect(() => {
    authAxios
      .get("/questions")
      .then((res) => {
        console.log("questions response data", res.data);
        setQuestion(res.data);
        // setPage(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    authAxios
      .get("/options")
      .then((res) => {
        console.log("options response data", res.data);
        setOption(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    authAxios
      .get("/categories")
      .then((res) => {
        console.log("categories response data", res.data);
        setCategory(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    authAxios
      .get(`/users/${1}`)
      .then((res) => {
        console.log("categories response data", res.data);
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // useEffect(() => {
  //   counter > 0 &&
  //     setTimeout(() => {
  //       setCounter(counter - 1);
  //     }, 1000);
  // }, [counter]);

  console.log("question", question);
  console.log("cetorgy", category);
  console.log("options", option);
  console.log("user", user?.data?.id);

  async function handleLogout() {
    await props.removeLogin();

    setRedirect(true);
  }

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to={"/login"} />;
    }
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  console.log(page);

  let initialValues;

  // if (question?.data?.length !== 0) {
  //   initialValues = {

  //   };
  // }
  // console.log("initialValues", initialValues);

  async function sumbitHandle(e) {
    e.preventDefault();
    // setPage(page + 1);
    authAxios
      .post("/results", initialValues)
      .then((res) => {
        console.log("intial value is submited to results");
      })
      .catch((err) => console.log(err));
  }

  if (props.login?.login.length === 0) {
    return <Redirect to={"/login"} />;
  } else if (!props.login?.login.access_token) {
    return (
      <Fragment>
        {renderRedirect()}
        <div className="main-field">
          <Card className="question-card mt-2">
            <CardHeader>
              {/* <strong>Instructions</strong> */}
              <Button
                className="float-right btn-danger"
                onClick={() => handleLogout()}
              >
                Logout
              </Button>
            </CardHeader>
          </Card>
        </div>

        <Formik
          initialValues={{
            user_id: user?.data?.id,
            total_points: "",
            result: {},
          }}
          onSubmit={sumbitHandle}
          render={(formProps) => {
            return (
              <Form>
                {counter}
                {question.length !== 0 ? (
                  <Question
                    {...formProps}
                    question={question?.data[page]}
                    option={option}
                    category={category}
                    page={page}
                    questionLength={question?.data.length}
                    nextPage={nextPage}
                    // timer={timer}
                  />
                ) : null}
              </Form>
            );
          }}
        />
      </Fragment>
    );
  } else {
    return <div>hello</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => ({
  removeLogin: () => {
    dispatch(removeLogin());
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
