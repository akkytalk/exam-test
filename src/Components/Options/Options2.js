/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import * as actions from "../../reduxStore/actions/index";
import { connect } from "react-redux";
import {
  Card,
  CardBody,
  Button,
  CardHeader,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Input,
} from "reactstrap";
import { Formik, Form, Field, FieldArray } from "formik";

import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Link from "@material-ui/core/Link";
import Sidebar from "../../Home/Sidebar/Sidebar";

function Options(props) {
  const accessToken = `${props.login?.login?.data?.token}`;

  let data = {
    token: accessToken,
  };

  console.log("data", data);

  useEffect(() => {
    //console.log("currentUser data from redux ", currentUser);
    props.onOptionsGetData(data);
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(baseUrl + "options", {
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     })
  //     .then((res) => {
  //       setQuestion2(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  console.log("options from main question ", props.options);

  const [user, setUser] = useState({
    question_id: "",
    options: [],
    points: "",
  });

  const [editing, setEditing] = useState(false);

  const initialFormState = {
    question_id: "",
    question_text: "",
    options: [],
    points: "",
  };

  const [currentUser, setCurrentUser] = useState(initialFormState);
  const currentUserInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleOptionChange = (index) => (event) => {
    // const { name, value } = event.target;
    // setUser({ ...user.options, [name]: value });
    let array = [...user.options];
    array[index] = event.target.value;
    user.options = array;
    console.log("tryopt", user.options);
    //
  };

  let array = new Array();
  let array2 = new Array();

  useEffect(() => {
    console.log("current user from useefect", currentUser);
  }, [currentUser]);

  // useEffect(() => {
  //   currentUser?.question_options?.map((opt, index) => {
  //     array2 = [...array2];
  //     array2[index] = opt.option_text;
  //     //currentUser.question_options = array2;

  //     console.log("array 2 line 108 ", array2);
  //   });
  // }, [currentUser?.question_options]);

  const handleOptionCurrentUserChange = (index) => (event) => {
    currentUser?.options?.map((opt, index) => {
      array2 = [...array2];
      array2[index] = opt.option_text;
      //currentUser.question_options = array2;

      console.log("array 2 line 108 ", array2);
    });
    //console.log("array 2 line 113 ", array2);

    array = [...array2];
    // console.log("array 1", array);
    array[index] = event.target.value; //0,1,2 array[0]
    currentUser.question_options = array;
    console.log("tryopt", currentUser.question_options);
    //
  };

  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  const toggle = () => {
    setModal(!modal);
    setEditing(false);
  };

  const toggle2 = () => {
    setModal2(!modal2);
    // setEditing(false);
  };
  console.log("user from main question page", user);
  console.log("Currentuser from main question page", currentUser);
  console.log("Currentuser from main question page", currentUser.question_text);

  // let data2 = {
  //   question_id: user.question_id,
  //   options: { 0: user.options.0 , 1:  }
  // }

  // let Currentdata = JSON.stringify({
  //   id: currentUser.id,
  //   major_category_name: currentUser.major_category_name,
  //   sub_category_name: currentUser.sub_category_name,
  //   category_name: currentUser.category_name,
  //   question_text: currentUser.question_text,
  //   instructions: currentUser.instructions,
  // });

  // console.log("currentdata", Currentdata);

  return (
    <React.Fragment>
      <div className="wrapper">
        {/* Navbar */}
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          {/* Left navbar links */}
          <ul className="navbar-nav d-flex align-items-center">
            <li className="nav-item">
              <a
                className="nav-link"
                data-widget="pushmenu"
                href="n"
                role="button"
              >
                <i className="fas fa-bars" />
              </a>
            </li>
            <li className="nav-item d-none d-sm-inline-block ml-2">
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
              >
                <Link color="inherit" href="/">
                  Home
                </Link>
                {/* <Link color="inherit">Master</Link> */}

                <Typography color="textPrimary">Options</Typography>
              </Breadcrumbs>
            </li>
          </ul>
          {/* SEARCH FORM */}
        </nav>
        {/* /.navbar */}
        {/*  */}

        <Sidebar />
        <div class="content-wrapper">
          <section className="content">
            <div className="container-fluid">
              <Card>
                <CardHeader className="bg-warning text-white">
                  <strong>Options Page</strong>
                  <Button className="btn-success  float-right" onClick={toggle}>
                    Add Options
                  </Button>
                  <Modal
                    className="modal-info modal-lg"
                    isOpen={modal}
                    toggle={toggle}
                  >
                    <ModalHeader toggle={toggle}>Add New Options</ModalHeader>
                    <ModalBody>
                      <Formik
                        initialValues={{
                          question_id: "",
                          options: ["option1", "option2", "option3", "option4"],
                          points: "",
                        }}
                        onSubmit={(values) => {
                          console.log("value", user);
                          props.onPostOptionsData(data, user);
                        }}
                        render={({ values }) => (
                          <Form>
                            <div
                              className="form-row"
                              style={{ fontSize: "12px" }}
                            >
                              <div className="form-group col-md-10">
                                <label htmlFor="inputPassword4">Question</label>
                                <select
                                  type="text"
                                  className="form-control"
                                  id="inputPassword4"
                                  name="question_id"
                                  value={user.question_id}
                                  onChange={handleInputChange}
                                >
                                  <option>select</option> &&
                                  {props.questions?.data?.map((quest) => {
                                    return (
                                      <option key={quest.id} value={quest.id}>
                                        {quest.question_text}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>

                              <FieldArray
                                name="options"
                                render={(arrayHelper) => (
                                  <div
                                    style={{
                                      display: "flex",
                                      flexFlow: "column",
                                      width: "100%",
                                    }}
                                  >
                                    {values.options &&
                                    values.options.length > 0 ? (
                                      values.options.map((option, index) => (
                                        <div
                                          key={index}
                                          className="form-group col-md-10"
                                        >
                                          <label htmlFor="inputPassword4">
                                            {" "}
                                            {`options ${index + 1} `}
                                          </label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="inputPassword4"
                                            placeholder=""
                                            value={option.option_text}
                                            name={`options${index}`}
                                            onChange={handleOptionChange(index)}
                                          />
                                        </div>
                                      ))
                                    ) : (
                                      <div></div>
                                    )}
                                  </div>
                                )}
                              />
                              <div className="form-group col-md-6">
                                <label htmlFor="inputPassword4">
                                  Select correct options
                                </label>
                                <select
                                  type="text"
                                  className="form-control"
                                  id="inputPassword4"
                                  name="points"
                                  onChange={handleInputChange}
                                >
                                  <option>select correct option</option>
                                  <option value={0}>option 1</option>
                                  <option value={1}>option 2</option>
                                  <option value={2}>option 3</option>
                                  <option value={3}>option 4</option>
                                </select>
                              </div>

                              <div className="form-group col-md-12 mt-4">
                                <Row style={{ justifyContent: "center" }}>
                                  <Col md={4}>
                                    <Button type="reset" color="danger" block>
                                      <b>Reset</b>
                                    </Button>
                                  </Col>
                                  <Col md={4}>
                                    <Button type="submit" color="primary" block>
                                      Submit
                                    </Button>
                                  </Col>
                                </Row>
                              </div>
                            </div>
                          </Form>
                        )}
                      />
                    </ModalBody>
                  </Modal>

                  <Modal
                    className="modal-info modal-lg"
                    isOpen={modal2}
                    toggle={toggle2}
                  >
                    <ModalHeader toggle={toggle2}>Edit Options</ModalHeader>
                    <ModalBody>
                      <Formik
                        initialValues={{
                          question_id: "",
                          // options: ["option1", "option2", "option3", "option4"],
                          points: "",
                        }}
                        onSubmit={(values) => {
                          console.log("value", user);
                          // props.onPostOptionsData(data, currentUser);
                        }}
                        render={({ values }) => (
                          <Form>
                            <div
                              className="form-row"
                              style={{ fontSize: "12px" }}
                            >
                              <div className="form-group col-md-12">
                                <label htmlFor="inputPassword4">Question</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="inputPassword4"
                                  name="question_id"
                                  value={currentUser.question_text}
                                  onChange={currentUserInputChange}
                                  disabled
                                />
                              </div>
                              {currentUser?.options?.map((opt, index) => {
                                return (
                                  <div className="form-group col-md-10">
                                    <label> Option {index + 1}</label>
                                    <Field
                                      type="text"
                                      className="form-control"
                                      id="inputPassword4"
                                      placeholder={opt?.option_text}
                                      // value={opt?.option_text}
                                      name={`options${index}`}
                                      onChange={handleOptionCurrentUserChange(
                                        index
                                      )}
                                    />
                                    <label>
                                      {opt.points == 1
                                        ? "correct"
                                        : "incorrect"}
                                    </label>
                                  </div>
                                );
                              })}
                              {/* <FieldArray
                                name="options"
                                render={(arrayHelper) => (
                                  <div
                                    style={{
                                      display: "flex",
                                      flexFlow: "column",
                                      width: "100%",
                                    }}
                                  >
                                    {values.options &&
                                      values.options.length > 0 ? (
                                        values.options.map((option, index) => (
                                          <div
                                            key={index}
                                            className="form-group col-md-10"
                                          >
                                            <label htmlFor="inputPassword4">
                                              {" "}
                                              {`options ${index + 1} `}
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              id="inputPassword4"
                                              placeholder=""
                                              value={
                                                option.option_text
                                              }
                                              name={`options${index}`}
                                              onChange={

                                                handleOptionChange(index)
                                              }
                                            />
                                          </div>
                                        ))
                                      ) : (
                                        <div></div>
                                      )}
                                  </div>
                                )}
                              /> */}
                              <div className="form-group col-md-6">
                                <label htmlFor="inputPassword4">
                                  Select correct options
                                </label>
                                <select
                                  type="text"
                                  className="form-control"
                                  id="inputPassword4"
                                  name="points"
                                  value={currentUser.points}
                                  onChange={currentUserInputChange}
                                >
                                  <option>select correct option</option>
                                  <option value={0}>option 1</option>
                                  <option value={1}>option 2</option>
                                  <option value={2}>option 3</option>
                                  <option value={3}>option 4</option>
                                </select>
                              </div>

                              <div className="form-group col-md-12 mt-4">
                                <div className="d-flex">
                                  <button
                                    className="btn btn-success"
                                    type="button"
                                    onClick={() => {
                                      props.onUpdateOptionsData(
                                        data,
                                        currentUser.question_id,
                                        editing,
                                        setEditing,
                                        currentUser,
                                        setCurrentUser
                                      );
                                      // setEditing(false);
                                      toggle2();
                                    }}
                                  >
                                    Update
                                  </button>
                                  <button
                                    className="btn btn-primary ml-3"
                                    type="button"
                                    onClick={() => {
                                      setEditing(false);
                                      toggle2();
                                    }}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          </Form>
                        )}
                      />
                    </ModalBody>
                  </Modal>
                </CardHeader>
                <CardBody>
                  <table
                    className="table table-sm"
                    style={{ fontSize: "12px" }}
                  >
                    <thead>
                      <tr>
                        {/* <th>ID</th> */}

                        <th scope="col">Q Id.</th>
                        <th scope="col">Questions</th>
                        <th scope="col">Option 1</th>
                        <th scope="col">Option 2</th>
                        <th scope="col">Option 3</th>
                        <th scope="col">Option 4</th>
                        {/* <th scope="col">Instructions</th> */}

                        {/* <th scope="col">Actions</th> */}
                      </tr>
                    </thead>
                    <tbody style={{ textTransform: "uppercase" }}>
                      {props.questions?.data?.length > 0 ? (
                        props.questions?.data?.map((user, index) => (
                          <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.question_text}</td>
                            {user?.question_options?.map((opt) => (
                              <td key={opt.id}>{opt.option_text}</td>
                            ))}
                            {/* <td>{user?.instructions}</td> */}

                            <td className="d-flex">
                              <Button
                                className="btn-warning p-1"
                                onClick={() => {
                                  props.onEditOptionsRow(
                                    data,
                                    user.id,
                                    editing,
                                    setEditing,
                                    currentUser,
                                    setCurrentUser
                                  );
                                  toggle2();
                                }}
                              >
                                <i
                                  className="fa fa-edit"
                                  aria-hidden="true"
                                ></i>
                              </Button>

                              {/* <Button
                                className="btn-danger ml-3 p-1"
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      "Are you sure you wish to delete this Options?"
                                    )
                                  )
                                    props.onDeleteOptions(data, user.id);
                                }}
                              >
                                <i
                                  className="fa fa-trash-alt "
                                  value={user.id}
                                  aria-hidden="true"
                                ></i>
                              </Button> */}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3}>No users</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </CardBody>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    majorcats: state.majorcats.majorcats,
    subcats: state.subcats.subcats,
    options: state.options.options,
    questions: state.questions.questions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onQuestionsGetData: (data) => dispatch(actions.questionsGetData(data)),
    onOptionsGetData: (data) => dispatch(actions.optionsGetData(data)),
    onDeleteOptions: (data, id) => dispatch(actions.deleteOptions(data, id)),
    onPostOptionsData: (data, user) =>
      dispatch(actions.postOptionsData(data, user)),
    onUpdateOptionsData: (
      data,
      id,
      editing,
      setEditing,
      currentUser,
      setCurrentUser
    ) =>
      dispatch(
        actions.updateOptionsData(
          data,
          id,
          editing,
          setEditing,
          currentUser,
          setCurrentUser
        )
      ),
    onEditOptionsRow: (
      data,
      id,
      editing,
      setEditing,
      currentUser,
      setCurrentUser
    ) =>
      dispatch(
        actions.editOptionsRow(
          data,
          id,
          editing,
          setEditing,
          currentUser,
          setCurrentUser
        )
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Options);
