import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Card, CardHeader, Button, CardBody, CardFooter } from "reactstrap";
import { removeLogin } from "../../reduxStore/actions/LoginCreators";
import { Link, withRouter } from "react-router-dom";

function Thankyou(props) {
    const handleLogout = async () => {
        await props.removeLogin();
    };

    console.log("login", props.login.login.user_name)

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
                            Thank-you for appearing for the English Assessment. We shall provide your marks to your faculty,who will advise your further.
                            In few months log-in once again with your short video, for which, the instructions will be provided to
                            you by your faculty
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
    connect(mapStateToProps, mapDispatchToProps)(Thankyou)
);
