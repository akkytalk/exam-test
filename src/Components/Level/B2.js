import React, { useEffect, useState } from "react";
import * as actions from "../../reduxStore/actions/index";
import { connect } from "react-redux";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";

import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Link from "@material-ui/core/Link";
import Sidebar from "../../Home/Sidebar/Sidebar";

function B2(props) {
  const accessToken = `${props.login?.login?.data?.token}`;

  let data = {
    token: accessToken,
  };

  console.log("data", data);

  useEffect(() => {
    //console.log("currentUser data from redux ", currentUser);
    props.onQuestionsGetData(data);
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(baseUrl + "questions", {
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

  console.log("questions from main question ", props.questions);

  const [user, setUser] = useState({
    major_category_name: "",
    sub_category_name: "",
    category_name: "B2",
    question_text: "",
    instructions: "",
  });

  const [editing, setEditing] = useState(false);

  const initialFormState = {
    id: "",
    major_category_name: "",
    sub_category_name: "",
    category_name: "B2",
    question_text: "",
    instructions: "",
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

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
    setEditing(false);
  };
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
                <Link color="inherit">Level</Link>

                <Typography color="textPrimary">Level B2 Questions</Typography>
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
                  <strong>Level B2 Questions</strong>
                  <Button className="btn-success  float-right" onClick={toggle}>
                    Add Level B2 Question
                  </Button>
                  <Modal
                    className="modal-info modal-lg"
                    isOpen={modal}
                    toggle={toggle}
                  >
                    <ModalHeader toggle={toggle}>
                      Add New Level B2 Question
                    </ModalHeader>
                    <ModalBody>
                      <form
                        onSubmit={(event) => {
                          event.preventDefault();
                          props.onPostQuestionsData(data, user);
                        }}
                      >
                        <div className="form-row" style={{ fontSize: "12px" }}>
                          <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">Level </label>
                            <select
                              type="text"
                              className="form-control"
                              id="inputPassword4"
                              name="category_name"
                              value={
                                editing
                                  ? currentUser.category_name
                                  : user.category_name
                              }
                              onChange={
                                editing
                                  ? currentUserInputChange
                                  : handleInputChange
                              }
                            >
                              <option value="">select</option>
                              <option value="B2">Level B2</option>
                            </select>
                          </div>

                          <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">Category </label>
                            <select
                              type="text"
                              className="form-control"
                              id="inputPassword4"
                              name="major_category_name"
                              value={
                                editing
                                  ? currentUser.major_category_name
                                  : user.major_category_name
                              }
                              onChange={
                                editing
                                  ? currentUserInputChange
                                  : handleInputChange
                              }
                            >
                              <option>select</option> &&
                              {props.majorcats?.map((dep) => {
                                return (
                                  <option key={dep.id} value={dep.name}>
                                    {dep.name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          <div className="form-group col-md-12">
                            <label htmlFor="inputPassword4">
                              Sub Category{" "}
                            </label>
                            <select
                              type="text"
                              className="form-control"
                              id="inputPassword4"
                              name="sub_category_name"
                              value={
                                editing
                                  ? currentUser.sub_category_name
                                  : user.sub_category_name
                              }
                              onChange={
                                editing
                                  ? currentUserInputChange
                                  : handleInputChange
                              }
                            >
                              <option>select</option> &&
                              {props.subcats?.map((sub) => {
                                if (
                                  user.major_category_name ===
                                    sub.major_category?.name ||
                                  currentUser.major_category_name ===
                                    sub.major_category?.name
                                ) {
                                  // console.log(
                                  //   "Sub Category",
                                  //   user.major_category_name
                                  // );

                                  return (
                                    <option key={sub.id} value={sub.name}>
                                      {sub.name}
                                    </option>
                                  );
                                }
                                return <div></div>;
                              })}
                            </select>
                          </div>

                          <div className="form-group col-md-12">
                            <label htmlFor="inputPassword4"> Question </label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputPassword4"
                              placeholder=""
                              value={
                                !editing
                                  ? user.question_text
                                  : currentUser.question_text
                              }
                              name="question_text"
                              onChange={
                                editing
                                  ? currentUserInputChange
                                  : handleInputChange
                              }
                            />
                          </div>

                          <div className="form-group col-md-12">
                            <label htmlFor="inputPassword4">
                              {" "}
                              Instructions{" "}
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputPassword4"
                              placeholder=""
                              value={
                                !editing
                                  ? user.instructions
                                  : currentUser.instructions
                              }
                              name="instructions"
                              onChange={
                                editing
                                  ? currentUserInputChange
                                  : handleInputChange
                              }
                            />
                          </div>
                          {/* <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4"> pincode  </label>
                            <input
                              type="number"
                              className="form-control"
                              id="inputPassword4"
                              placeholder=""
                              value={
                                !editing ? user.pincode : currentUser.pincode
                              }
                              name="pincode"
                              onChange={
                                editing
                                  ? currentUserInputChange
                                  : handleInputChange
                              }
                            />
                          </div>

                          <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4"> Status </label>
                            <select
                              type="text"
                              className="form-control"
                              id="inputPassword4"
                              name="status"
                              value={editing ? currentUser.status : user.status}
                              onChange={
                                editing
                                  ? currentUserInputChange
                                  : handleInputChange
                              }
                            >
                              <option>select</option>
                              <option value="1">active</option>
                              <option value="0">inactive</option>
                            </select>
                          </div> */}

                          <div className="form-group col-md-12 mt-4">
                            {!editing ? (
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
                            ) : (
                              <div className="d-flex">
                                <Button
                                  className="btn btn-success"
                                  type="button"
                                  onClick={() => {
                                    props.onUpdateQuestionsData(
                                      data,
                                      currentUser.id,
                                      editing,
                                      setEditing,
                                      currentUser,
                                      setCurrentUser
                                    );
                                    toggle();
                                  }}
                                >
                                  Update
                                </Button>
                                <Button
                                  className="btn btn-primary ml-3"
                                  type="button"
                                  onClick={() => {
                                    setEditing(false);
                                    toggle();
                                  }}
                                >
                                  Cancel
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </form>
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
                        <th scope="col">Q No.</th>
                        <th scope="col">Questions</th>
                        <th scope="col">Option 1</th>
                        <th scope="col">Option 2</th>
                        <th scope="col">Option 3</th>
                        <th scope="col">Option 4</th>
                        <th scope="col">Instructions</th>

                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {props.questions?.data?.length > 0 ? (
                        props.questions?.data?.map((user) => {
                          if (user.category_id == 4)
                            return (
                              <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.question_text}</td>
                                {user?.question_options?.map((opt) => (
                                  <td key={opt.id}>{opt.option_text}</td>
                                ))}
                                <td>{user?.instructions}</td>

                                <td className="d-flex">
                                  <Button
                                    className="btn-warning p-1"
                                    onClick={() => {
                                      props.onEditQuestionsRow(
                                        data,
                                        user.id,
                                        editing,
                                        setEditing,
                                        currentUser,
                                        setCurrentUser
                                      );
                                      toggle();
                                    }}
                                  >
                                    <i
                                      className="fa fa-edit"
                                      aria-hidden="true"
                                    ></i>
                                  </Button>

                                  <Button
                                    className="btn-danger ml-3 p-1"
                                    onClick={() => {
                                      if (
                                        window.confirm(
                                          "Are you sure you wish to delete this Questions?"
                                        )
                                      )
                                        props.onDeleteQuestions(data, user.id);
                                    }}
                                  >
                                    <i
                                      className="fa fa-trash-alt "
                                      value={user.id}
                                      aria-hidden="true"
                                    ></i>
                                  </Button>
                                </td>
                              </tr>
                            );
                        })
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
    questions: state.questions.questions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMajorcatsGetData: (data) => dispatch(actions.majorcatsGetData(data)),
    onSubcatsGetData: (data) => dispatch(actions.subcatsGetData(data)),
    onQuestionsGetData: (data) => dispatch(actions.questionsGetData(data)),
    onDeleteQuestions: (data, id) =>
      dispatch(actions.deleteQuestions(data, id)),
    onPostQuestionsData: (data, user) =>
      dispatch(actions.postQuestionsData(data, user)),
    onUpdateQuestionsData: (
      data,
      id,
      editing,
      setEditing,
      currentUser,
      setCurrentUser
    ) =>
      dispatch(
        actions.updateQuestionsData(
          data,
          id,
          editing,
          setEditing,
          currentUser,
          setCurrentUser
        )
      ),
    onEditQuestionsRow: (
      data,
      id,
      editing,
      setEditing,
      currentUser,
      setCurrentUser
    ) =>
      dispatch(
        actions.editQuestionsRow(
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
export default connect(mapStateToProps, mapDispatchToProps)(B2);
