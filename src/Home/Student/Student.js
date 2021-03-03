import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Card, CardHeader, Button, CardBody, CardFooter } from "reactstrap";
import { removeLogin } from "../../reduxStore/actions/LoginCreators";
import { Link, withRouter } from "react-router-dom";

function Student(props) {
  const handleLogout = async () => {
    await props.removeLogin();
  };
  if (props.login?.login.length === 0) {
    return <Redirect to={"/login"} />;
  } else if (!props.login?.login.access_token) {
    return (
      <Fragment>
        <div className="main-field">
          <Card className="question-card mt-2">
            <CardHeader>
              Welocome Student
              <Button
                className="float-right btn-danger"
                onClick={() => handleLogout()}
              >
                Logout
              </Button>
            </CardHeader>
            <CardBody>
              instructions: Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard
              dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It
              has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </CardBody>
            <CardFooter>
              <Link to="test">
                <Button className="btn-success">Start Test</Button>
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
