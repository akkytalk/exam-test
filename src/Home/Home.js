/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect, useHistory } from "react-router";
import { Card, CardHeader, Button, CardBody, CardFooter } from "reactstrap";
import { removeLogin } from "../reduxStore/actions/LoginCreators";
import { withRouter } from "react-router-dom";

import "./Home.css";
import axios from "axios";
import { baseUrl } from "../shared/baseUrl";
import { Formik, Form } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import "./Questions/Question.css";

function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   */
  value: 100,
};

var result = new Array();

function Home(props) {
  const [page, setPage] = useState(0);

  const [progress, setProgress] = React.useState(100);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress <= 0) {
          setPage((page) => page + 1);
          // setValue();
          // answer();
          return 100;
        } else {
          return prevProgress - 10;
        }
      });

      // (prevProgress <= 0 ? 100 : prevProgress - 10));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [page]);

  const classes = useStyles();

  const [loading, setLoading] = useState(true);

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

  const [value, setValue] = React.useState();
  const [counter, setCounter] = React.useState(0);

  useEffect(() => {
    authAxios
      .get("/questions")
      .then((res) => {
        console.log("questions response data", res.data);
        setQuestion(res.data);
        if (res) {
          setProgress(100);
          setLoading(false);
        }
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
          setProgress(100);
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
    setProgress(100);
  };

  const answer = () => {
    console.log(value);
    console.log(question?.data[page]?.id);
    var obj = {};
    obj[question?.data[page]?.id] = value;
    console.log(obj);
    result.push(obj);

    console.log(result);
  };

  const history = useHistory();

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
        history.push("/thankyou");
      })
      .catch((err) => console.log(err));
  };

  // React.useEffect(() => {

  //   const timer = setInterval(() => {
  //     setPage(page => page + 1)
  //   }, 10000);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [page]);

  if (props.login?.login.length === 0) {
    return <Redirect to={"/login"} />;
  } else if (!props.login?.login.access_token) {
    return (
      <Fragment>
        {/* {renderRedirect()} */}

        <div className="main-field">
          {loading ? (
            <CircularProgress
              style={{
                position: "absolute",
                top: "30%",
                left: "45%",
                width: "100px",
                height: "100px",
              }}
            />
          ) : null}
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
            result: {},
          }}
          onSubmit={handleSubmit}
        >
          {(formProps) => (
            <Form>
              {question.length !== 0 ? (
                <Card className="question">
                  <CardHeader>
                    <div className={classes.root}>
                      <LinearProgress variant="determinate" value={progress} />
                    </div>
                  </CardHeader>
                  {/* <CardHeader>
                    <strong style={{ textTransform: "capitalize" }}>
                      {question?.data[page]?.major_category?.name}
                    </strong>
                    <p className="pull-right text-red">{counter}</p>
                  </CardHeader> */}
                  <CardHeader
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h6 style={{ fontSize: "14px" }}>
                      Question No.{"  "}
                      {page + 1}
                    </h6>
                    <div className="float-right"></div>
                  </CardHeader>
                  <CardHeader
                    style={{
                      display: "flex",

                      fontSize: "12px",
                    }}
                  >
                    {/* <h6>Instructions:</h6> */}
                    <h6 className="" style={{ textTransform: "uppercase" }}>
                      {question?.data[page]?.instructions}
                    </h6>
                  </CardHeader>
                  <CardBody style={{ textTransform: "uppercase" }}>
                    <div className="mb-2">
                      <h6>{question?.data[page]?.question_text} </h6>

                      {option?.data?.map((opt, ind) => {
                        if (question?.data[page]?.id == opt.question_id)
                          return (
                            <div key={ind}>
                              <input
                                type="radio"
                                className="mr-2"
                                key={opt.question_id}
                                name="
                                "
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
