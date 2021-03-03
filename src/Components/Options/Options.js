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
    options: ["option1", "option2", "option3", "option4"],
    points: "",
  });

  const [editing, setEditing] = useState(false);

  const initialFormState = {
    id: "",
    question_id: "",
    question_text: "",
    option_text: "",
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

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
    setEditing(false);
  };

  console.log("user from main question page", user);
  console.log("Currentuser from main question page", currentUser);

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
                      <form
                        onSubmit={(event) => {
                          event.preventDefault();
                          props.onPostOptionsData(data, user);
                        }}
                      >
                        <div className="form-row" style={{ fontSize: "12px" }}>
                          {/* <div className="form-group col-md-12">
                            <label htmlFor="inputPassword4">Question </label>
                            <select
                              type="text"
                              className="form-control"
                              id="inputPassword4"
                              name="question_id"
                              value={
                                editing
                                  ? currentUser.question_id
                                  : user.question_id
                              }
                              onChange={
                                editing
                                  ? currentUserInputChange
                                  : handleInputChange
                              }
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
                          </div> */}

                          <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">Question </label>
                            <select
                              type="text"
                              className="form-control"
                              id="inputPassword4"
                              name="question_id"
                              value={
                                editing
                                  ? currentUser.question_id
                                  : user.question_id
                              }
                              onChange={
                                editing
                                  ? currentUserInputChange
                                  : handleInputChange
                              }
                            >
                              <option>select</option> &&
                              {props.questions?.data?.map((quest) => {
                                return (
                                  <option key={quest.id} value={quest.id}>
                                    {quest.id}
                                  </option>
                                );
                              })}
                            </select>
                          </div>

                          <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4"> Opition 1</label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputPassword4"
                              placeholder=""
                              value={
                                !editing
                                  ? user.options.option1
                                  : currentUser.option_text
                              }
                              name="option1?.option_text"
                              onChange={
                                editing
                                  ? currentUserInputChange
                                  : handleInputChange
                              }
                            />
                          </div>

                          <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4"> Opition 2</label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputPassword4"
                              placeholder=""
                              value={
                                !editing
                                  ? user.option2?.option_text
                                  : currentUser.question_options
                              }
                              name="option2?.option_text"
                              onChange={
                                editing
                                  ? currentUserInputChange
                                  : handleInputChange
                              }
                            />
                          </div>

                          <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4"> Opition 3 </label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputPassword4"
                              placeholder=""
                              value={
                                !editing
                                  ? user.question_options
                                  : currentUser.question_options
                              }
                              name="question_options"
                              onChange={
                                editing
                                  ? currentUserInputChange
                                  : handleInputChange
                              }
                            />
                          </div>

                          <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4"> Opition 4 </label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputPassword4"
                              placeholder=""
                              value={
                                !editing
                                  ? user.question_options
                                  : currentUser.question_options
                              }
                              name="question_options"
                              onChange={
                                editing
                                  ? currentUserInputChange
                                  : handleInputChange
                              }
                            />
                          </div>

                          <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">
                              Select correct options
                            </label>
                            <select
                              type="text"
                              className="form-control"
                              id="inputPassword4"
                              name="question_id"
                              value={
                                editing
                                  ? currentUser.question_id
                                  : user.question_id
                              }
                              onChange={
                                editing
                                  ? currentUserInputChange
                                  : handleInputChange
                              }
                            >
                              <option>select correct option</option>
                              <option value="option 1">option 1</option>
                              <option value="option 2">option 2</option>
                              <option value="option 3">option 3</option>
                              <option value="option 4">option 4</option>
                            </select>
                          </div>

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
                                <button
                                  className="btn btn-success"
                                  type="button"
                                  onClick={() => {
                                    props.onUpdateOptionsData(
                                      data,
                                      currentUser.id,
                                      editing,
                                      setEditing,
                                      currentUser,
                                      setCurrentUser
                                    );
                                    // setEditing(false);
                                    toggle();
                                  }}
                                >
                                  Update
                                </button>
                                <button
                                  className="btn btn-primary ml-3"
                                  type="button"
                                  onClick={() => {
                                    setEditing(false);
                                    toggle();
                                  }}
                                >
                                  Cancel
                                </button>
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
                        <th scope="col">Q Id.</th>
                        <th scope="col">Questions</th>
                        <th scope="col">Option 1</th>
                        <th scope="col">Option 2</th>
                        <th scope="col">Option 3</th>
                        <th scope="col">Option 4</th>
                        {/* <th scope="col">Instructions</th> */}

                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {props.questions?.data?.length > 0 ? (
                        props.questions?.data?.map((user) => (
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
                              </Button>
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
