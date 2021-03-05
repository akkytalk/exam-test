import React, { Fragment } from "react";
import {
  Card,
  Button,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  CardBody,
  Row,
  Col,
} from "reactstrap";

import { Formik, Form, Field } from "formik";

import CustomInput from "../views/Custom/CustomInput";
import FA from "react-fontawesome";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { postSignup } from "../reduxStore/actions";

const mapStateToProps = (state) => {
  return {
    signup: state.signup,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postSignup: (data) => {
    dispatch(postSignup(data));
  },
});

function Signup(props) {
  const handleSubmit = (values, setSubmitting) => {
    let data = {
      first_name: values.first_name,
      middle_name: values.middle_name,
      last_name: values.last_name,
      email: values.email,
      mobile: values.mobile,
      city: values.city,
      password: values.password,
      password_confirmation: values.password_confirmation,
    };
    console.log(data);
    props.postSignup(data);
    setSubmitting(false);
    return;
  };

  console.log("signup data", props.signup?.signup);

  if (props.signup?.signup.length !== 0) {
    return <Redirect to={"/student"} />;
  } else if (props.signup?.isLoading) {
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
      <div
        className="col-xs-12 col-sm-12 col-md-10 col-lg-10"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Card>
          <h3 style={{ fontSize: "4em", textAlign: "center" }} className="p-2">
            Sign Up
          </h3>

          <Formik
            initialValues={{
              first_name: "",
              middle_name: "",
              last_name: "",
              email: "",
              mobile: "",
              city: "",
              password: "",
              password_confirmation: "",
            }}
            onSubmit={handleSubmit}
          >
            {(formProps) => (
              <Form>
                <div className="p-4  d-flex flex-column ">
                  <Col
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <FormGroup>
                      <InputGroup size="lg">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <FA name={"user-circle"} />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="name"
                          name="first_name"
                          id="first_name"
                          placeholder="Enter First Name"
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup size="lg">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <FA name={"user-circle"} />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="name"
                          name="middle_name"
                          id="middle_name"
                          placeholder="Enter Middle Name"
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup size="lg">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <FA name={"user-circle"} />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="name"
                          name="last_name"
                          id="last_name"
                          placeholder="Enter Last Name"
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <FormGroup>
                      <InputGroup size="lg">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <FA name={"envelope-square"} />
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
                            <FA name={"phone-volume"} />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="number"
                          name="mobile"
                          id="mobile"
                          placeholder="Enter Mobile Number"
                        />
                      </InputGroup>
                    </FormGroup>

                    <FormGroup>
                      <InputGroup size="lg">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <FA name={"building"} />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="text"
                          name="city"
                          id="city"
                          placeholder="Enter City Name"
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
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
                      <InputGroup size="lg">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <FA name={"unlock-alt"} />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Field
                          component={CustomInput}
                          type="password"
                          name="password_confirmation"
                          id="password_confirmation"
                          placeholder="Confirm Password"
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </div>
                <Col
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    paddingLeft: "300px",
                    paddingRight: "300px",
                  }}
                >
                  <FormGroup>
                    <span className="text-danger pt-3 text-center">
                      {props.signup?.errMess
                        ? props.signup?.errMess?.message ===
                          "Error:401 Unauthorized"
                          ? "Wrong Signup credentials"
                          : props.signup?.errMess?.message
                        : null}
                    </span>
                    <Button
                      color="primary"
                      className=""
                      type="submit"
                      size="lg"
                      block
                      disabled={formProps.isSubmitting}
                    >
                      Sign Up
                    </Button>
                  </FormGroup>
                  <FormGroup>
                    <Link to="/login">
                      <Button
                        className="btn-warning "
                        type="button"
                        size="lg"
                        block
                        // disabled={formProps.isSubmitting}
                      >
                        Login
                      </Button>
                    </Link>
                  </FormGroup>
                </Col>
              </Form>
            )}
          </Formik>
        </Card>
      </div>
    </Fragment>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

// export default Signup2;
