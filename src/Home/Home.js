/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Card, CardHeader, Button, CardBody, CardFooter } from "reactstrap";
import { removeLogin } from "../reduxStore/actions/LoginCreators";
import { withRouter } from "react-router-dom";

import "./Home.css";
import axios from "axios";
import { baseUrl } from "../shared/baseUrl";
import { Formik, Form } from "formik";

var result = new Array();

function Home(props) {
  const accessToken = `${props.login?.login?.data?.token}`;

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

  const [value, setValue] = React.useState();
  const [counter, setCounter] = React.useState(0);

  useEffect(() => {
    authAxios
      .get("/questions")
      .then((res) => {
        console.log("questions response data", res.data);
        setQuestion(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    authAxios
      .get("/options")
      .then((res) => {
        console.log("options response data", res.data);
        setOption(res.data);
        if (res) {
          setCounter(10);
        }
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

  const handleLogout = async () => {
    await props.removeLogin();

    setRedirect(true);
  };

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to={"/login"} />;
    }
  };

  const nextPage = () => {
    answer();
    setPage(page + 1);
    setCounter(10);
    setValue();
  };

  const answer = () => {
    console.log(value);
    var obj = {};
    obj[question.data[page].id] = value;
    console.log(obj);
    result.push(obj);

    console.log(result);
  };

  const handleSubmit = (values) => {
    let data = {
      result: result,
    };
    console.log(values);
    authAxios
      .post("/test", data)
      .then((res) => {
        console.log(res);
        console.log("intial value is submited to results");
      })
      .catch((err) => console.log(err));
  };

  if (props.login?.login.length === 0) {
    return <Redirect to={"/login"} />;
  } else if (!props.login?.login.access_token) {
    return (
      <Fragment>
        {/* {renderRedirect()} */}
        <div className="main-field">
          <Card className="question-card mt-2">
            <CardHeader>
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
          onSubmit={handleSubmit}
        >
          {(formProps) => (
            <Form>
              {question.length !== 0 ? (
                <Card className="question">
                  <CardHeader>
                    <strong style={{ textTransform: "capitalize" }}>
                      {question?.data[page]?.major_category?.name}
                    </strong>
                    <p className="pull-right text-red">{counter}</p>
                  </CardHeader>
                  <CardHeader
                    style={{
                      display: "flex",

                      fontSize: "12px",
                    }}
                  >
                    {/* <h6>Instructions:</h6> */}
                    <span className="ml-4">
                      {question?.data[page]?.instructions}
                    </span>
                  </CardHeader>
                  <CardBody>
                    Question
                    <div className="mb-2">
                      <h6>{question?.data[page].question_text} ?</h6>

                      {option?.data?.map((opt, ind) => {
                        if (question?.data[page].id == opt.question_id)
                          return (
                            <div key={ind}>
                              <input
                                type="radio"
                                className="mr-2"
                                key={opt.question_id}
                                name="total_points"
                                onChange={() => setValue(opt.id)}
                                value={opt.id && opt.points}
                              />
                              {opt.option_text}
                            </div>
                          );
                      })}
                    </div>
                  </CardBody>
                  <CardFooter>
                    {page === question.data.length - 1 ? (
                      <Button
                        block
                        className="btn-success text-white mt-2 question-card ml-auto mr-auto"
                        type="submit"
                      >
                        Submit
                      </Button>
                    ) : (
                        <Button
                          block
                          className="btn-warning text-white mt-2 question-card ml-auto mr-auto"
                          onClick={nextPage}
                          id="myButtonId"
                        >
                          Next
                        </Button>
                      )}
                  </CardFooter>
                </Card>
              ) : null}
            </Form>
          )}
        </Formik>
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
