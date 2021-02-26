import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import * as actions from "../../reduxStore/actions";
import { withRouter } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Form,
  Button,
} from "reactstrap";
import { Formik } from "formik";
import Question from "../Questions/Question";

function Student(props) {
  const accessToken = `${props.login?.login?.data?.token}`;

  let data = {
    token: accessToken,
  };

  console.log("data", data);

  const [page, setPage] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setPage(page + 1);
    }, 10000);
  }, [page]);

  console.log(page);

  let initialValues;

  if (props.question?.data?.length !== 0) {
    initialValues = {
      //   user_id: user?.data?.id,
      total_points: "",
    };
  }
  console.log("initialValues", initialValues);
  const [redirect, setRedirect] = useState(false);

  async function handleLogout() {
    await props.removeLogin();

    setRedirect(true);
  }

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to={"/login"} />;
    }
  };

  async function sumbitHandle(e) {
    e.preventDefault();
    setPage(page + 1);
  }

  console.log("questions", props.questions);

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
            {/* <CardBody>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              sit amet suscipit erat, id auctor ipsum. Maecenas hendrerit sed
              odio a cursus.
            </CardBody> */}
            {/* <CardFooter>
              <Button
                className="float-left btn-success"
                onClick={startTestHandle}
              >
                Start Test
              </Button>
              <Button
                className="float-right btn-danger"
                onClick={stopTestHandle}
              >
                Stop Test
              </Button>
            </CardFooter> */}
          </Card>
        </div>

        <Formik
          initialValues={{ initialValues }}
          onSubmit={sumbitHandle}
          render={(formProps) => {
            return (
              <Form>
                {props.question?.length !== 0 ? (
                  <>
                    <Question
                      question={props.question?.data[page]}
                      option={props.option?.data}

                      // timer={timer}
                    />
                    {page === props.question?.data.length - 1 ? (
                      <Button
                        block
                        className="btn-success text-white mt-2 question-card ml-auto mr-auto"
                        id="myButtonId"
                        // type="submit"
                      >
                        Submit
                      </Button>
                    ) : (
                      <Button
                        block
                        className="btn-warning text-white mt-2 question-card ml-auto mr-auto"
                        // onClick={nextPage}
                        id="myButtonId"
                        onClick={sumbitHandle}
                      >
                        Next
                      </Button>
                    )}
                  </>
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
    options: state.options.options,
    questions: state.questions.questions,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onOptionsGetData: (data) => dispatch(actions.optionsGetData(data)),
  onQuestionsGetData: (data) => dispatch(actions.questionsGetData(data)),

  removeLogin: () => {
    dispatch(actions.removeLogin());
  },
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Student)
);
