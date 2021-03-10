import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Card, CardHeader, Button, CardBody, CardFooter } from "reactstrap";
import { removeLogin } from "../../reduxStore/actions/LoginCreators";
import { Link, withRouter } from "react-router-dom";

function ExamAppeared(props) {
  const handleLogout = async () => {
    await props.removeLogin();
  };

  //  console.log("login", props.login.login.user_name)

  if (props.login?.login.length === 0) {
    return <Redirect to={"/login"} />;
  } else if (!props.login?.login.access_token) {
    return (
      <Fragment>
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
            <CardBody style={{ textAlign: "center" }}>
              <p>
                {props.login.login.user_name} You have already appeared the exam
              </p>
              <br />
            </CardBody>
            <CardFooter>
              {/* <Link to="test">
                                <Button className="btn-success">Start Test</Button>
                            </Link> */}
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
  connect(mapStateToProps, mapDispatchToProps)(ExamAppeared)
);
