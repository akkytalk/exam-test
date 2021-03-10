import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Card, CardHeader, Button, CardBody, CardFooter } from "reactstrap";
import { removeLogin } from "../../reduxStore/actions/LoginCreators";
import { Link, withRouter } from "react-router-dom";

function Student2(props) {
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
              ENGLISH SECTION
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
                Welcome to the first module of Assessment Centre. This module
                will help in knowing your level of competence for English
                Language.
                <br />
                <br />
                As you know, now a days employers prefer candidates who can
                communicate well in English. We are starting with assessment of
                English Language competence, so that if need be you have long
                enough time to improve upon it.
                <br />
                <br />
                From next screen onwards there are 4 options for each
                question/statement. Select the option, which according to you is
                the correct answer, by clicking on the radio button. After that
                click on the ‘Next’ button to go to the next question.
                <br />
                <br />
                You will have 10 seconds to answer each question. If you do not
                select an answer in 10 seconds the screen will automatically go
                to the next question. It will take 30 minutes for you to answer
                all the questions. Once you complete the assessment, click on
                ‘submit’ button on last screen, for us to calculate your score.
              </span>
            </CardBody>

            <CardFooter>
              <span>WISHING YOU GOOD LUCK</span>
              <Link to="/test">
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
  connect(mapStateToProps, mapDispatchToProps)(Student2)
);
