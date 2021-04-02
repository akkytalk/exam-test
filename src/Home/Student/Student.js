import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Card, CardHeader, Button, CardBody, CardFooter } from "reactstrap";
import { removeLogin } from "../../reduxStore/actions/LoginCreators";
import { Link, withRouter } from "react-router-dom";

function Student(props) {
  //console.log("login test", props.login?.login?.test);

  const handleLogout = async () => {
    await props.removeLogin();
  };
  if (props.login?.login.length === 0) {
    return <Redirect to={"/login"} />;
  } else if (props.login?.login?.test !== null) {
    return <Redirect to={"/exam-appeared"} />;
  } else if (!props.login?.login.access_token) {
    return (
      <Fragment>
        <div className="main-field">
          <Card className="question-card mt-2">
            <CardHeader>
              <div style={{ display: "flex" }}>
                Welcome Student{" "}
                <h5 className="ml-4">{props.login?.login?.user_name}</h5>
              </div>
              <Button
                className="float-right btn-danger"
                onClick={() => handleLogout()}
              >
                Logout
              </Button>
            </CardHeader>
            <CardBody>
              <span>
                {" "}
                Welcome to on-line assessment centre. This assessment centre
                will help you in tracking your progress for your interview
                preparedness, while completing the course.
                <br />
                <br />
                During your course with us, we will assess you on following
                aspects:
                <br />
                1. Competence on English Language
                <br />
                2. Soft Skills &amp; Self-Introduction
                <br />
                3. Quality of Bio-data
                <br />
                4. Technical knowledge
                <br />
                5. Interview Skills
                <br />
                <br />
                This assessment centre will help you in knowing your areas of
                development, so that you can work upon them &amp; be successful
                in the interview.
              </span>
            </CardBody>

            <CardFooter>
              <span>WE WISH YOU BEST OF LUCK FOR A VERY SUCCESSFUL CAREER</span>
              <Link to="/student2">
                <Button className="btn-success float-right">Next </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Student)
);
