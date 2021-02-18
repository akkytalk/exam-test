import React, { Fragment, useState } from "react";
import {
  Card,
  Button,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  CardBody,
} from "reactstrap";
import * as actions from "../reduxStore/actions/index";

import { Formik, Form, Field } from "formik";

import CustomInput from "../views/Custom/CustomInput";
import FA from "react-fontawesome";
import { Redirect, useHistory } from "react-router";
import { connect } from "react-redux";
const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postLogin: (data) => {
    dispatch(actions.postLogin(data));
  },
});

function Login2(props) {
  const history = useHistory();
  const [redirect, setRedirect] = useState(false);

  console.log("login data", props.login.login);

  const handleSubmit = (values, { setSubmitting }) => {
    setRedirect(true);
    let data = {
      email: values.email,
      password: values.password,
    };
    console.log(data);
    props.postLogin(data);
    setSubmitting(false);
    localStorage.setItem("usertoken", props.login.login.data.token);

    return;
  };

  // if (props.login?.login?.data?.token == null) {
  //   return <Redirect from="/home" to="/" />;
  // } else if (props.login?.login?.data?.token !== null) {
  //   return <Redirect to="/home" />;
  // }
  // if (usertoken !== "") {
  //   return <Redirect to="/home" />;
  // }
  // if (usertoken == "") {
  //   return <Redirect from="/home" to="/" />;
  // }
  if (props.login?.isLoading) {
    //Spinner when service data sending under processing
    return (
      <div
        className="col-xs-12 col-sm-12 col-md-5 col-lg-4"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Card className="p-5">
          <CardBody>
            <div
              className="spinner-grow text-success col-xs-12 col-sm-12 col-md-5 col-lg-4"
              style={{
                width: "3rem",
                height: "3rem",
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <Fragment>
      {redirect && <Redirect to="/home" />}
      <div
        className="col-xs-12 col-sm-12 col-md-5 col-lg-4"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Card>
          <h3 style={{ fontSize: "4em", textAlign: "center" }} className="p-2">
            SignIn
          </h3>

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={handleSubmit}
          >
            {(formProps) => (
              <Form className="p-4">
                <FormGroup>
                  <InputGroup size="lg">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <FA name={"user-circle"} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Field
                      component={CustomInput}
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter Email"
                    />
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <InputGroup size="lg">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <FA name={"unlock-alt"} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Field
                      component={CustomInput}
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter Password"
                    />
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <Button
                    color="primary"
                    type="submit"
                    size="lg"
                    block
                    disabled={formProps.isSubmitting}
                  >
                    Log In
                  </Button>
                  <span className="text-danger pt-3 text-center">
                    {props.login?.errMess
                      ? props.login?.errMess?.message ===
                        "Error:401 Unauthorized"
                        ? "Wrong Login credentials"
                        : props.login?.errMess?.message
                      : null}
                  </span>
                </FormGroup>
              </Form>
            )}
          </Formik>
        </Card>
      </div>
    </Fragment>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login2);

// export default Login2;
