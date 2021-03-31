/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import * as actions from "../../../reduxStore/actions";
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
import Sidebar from "../../../Home/Sidebar/Sidebar";

function BodyLanguage(props) {
  const accessToken = `${props.login?.login?.data?.token}`;

  let data = {
    token: accessToken,
  };

  console.log("data", data);

  useEffect(() => {
    props.onMarkscallGetData(data);
    props.onCriteriaGetData(data);
    props.onUsersGetData(data);
  }, []);

  console.log("markscall from main question ", props.markscall);

  const [user, setUser] = useState({
    asses_name: "Body Language",
    criteria_id: "",
    user_id: "",
    marks: "",
  });

  const [editing, setEditing] = useState(false);

  const initialFormState = {
    id: "",
    assesement_id: "",
    asses_name: "",
    criteria_id: "",
    criteria_name: "",
    user_id: "",
    user_name: "",
    marks: "",
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
  // console.log("subcats", props.subcats);

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

                <Typography color="textPrimary">Body Language</Typography>
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
                  <strong>Body Language</strong>
                  <Button className="btn-success  float-right" onClick={toggle}>
                    Add Body Language Marks
                  </Button>
                  <Modal
                    className="modal-info modal-lg"
                    isOpen={modal}
                    toggle={toggle}
                  >
                    <ModalHeader toggle={toggle}>
                      Add New Body Language
                    </ModalHeader>
                    <ModalBody>
                      <form
                        onSubmit={(event) => {
                          event.preventDefault();
                          props.onPostMarkscallData(data, user);
                        }}
                      >
                        <div className="form-row" style={{ fontSize: "12px" }}>
                          <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">Criteria </label>
                            <select
                              type="text"
                              className="form-control"
                              id="inputPassword4"
                              name="criteria_id"
                              value={
                                editing
                                  ? currentUser.criteria_id
                                  : user.criteria_id
                              }
                              onChange={
                                editing
                                  ? currentUserInputChange
                                  : handleInputChange
                              }
                            >
                              <option>select</option> &&
                              {props.criteria?.map((dep) => {
                                if (dep.assesement_id == 3)
                                  return (
                                    <option key={dep.id} value={dep.id}>
                                      {dep.name}
                                    </option>
                                  );
                              })}
                            </select>
                          </div>

                          <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">Select User</label>
                            <select
                              type="text"
                              className="form-control"
                              id="inputPassword4"
                              name="user_id"
                              value={
                                editing ? currentUser.user_id : user.user_id
                              }
                              onChange={
                                editing
                                  ? currentUserInputChange
                                  : handleInputChange
                              }
                            >
                              <option>select</option> &&
                              {props.users?.data?.map((dep) => {
                                return (
                                  <option key={dep.id} value={dep.id}>
                                    {dep.name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>

                          <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4"> Marks </label>
                            <input
                              type="number"
                              className="form-control"
                              id="inputPassword4"
                              placeholder="Enter Marks"
                              value={!editing ? user.marks : currentUser.marks}
                              name="marks"
                              onChange={
                                editing
                                  ? currentUserInputChange
                                  : handleInputChange
                              }
                            />
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
                                    props.onUpdateMarkscallData(
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
                        {/* <th scope="col">Sr No.</th> */}
                        <th scope="col">user Id.</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Criteria Name</th>
                        <th scope="col">Marks</th>

                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody style={{ textTransform: "uppercase" }}>
                      {props.markscall?.length > 0 ? (
                        props.markscall?.map((user, index) => {
                          if (user.assesement_id == 3)
                            return (
                              <tr key={user.id}>
                                {/* <td>{index + 1}</td> */}
                                <td>{user?.user?.id}</td>
                                <td>{user.user?.name}</td>

                                <td>{user?.criteria?.name}</td>
                                <td>{user?.marks}</td>

                                <td className="d-flex">
                                  <Button
                                    className="btn-warning p-1"
                                    onClick={() => {
                                      props.onEditMarkscallRow(
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
                                          "Are you sure you wish to delete this Markscall?"
                                        )
                                      )
                                        props.onDeleteMarkscall(data, user.id);
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
    criteria: state.criteria.criteria,
    users: state.users.users,
    markscall: state.markscall.markscall,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCriteriaGetData: (data) => dispatch(actions.criteriaGetData(data)),
    onUsersGetData: (data) => dispatch(actions.usersGetData(data)),
    onMarkscallGetData: (data) => dispatch(actions.markscallGetData(data)),
    onDeleteMarkscall: (data, id) =>
      dispatch(actions.deleteMarkscall(data, id)),
    onPostMarkscallData: (data, user) =>
      dispatch(actions.postMarkscallData(data, user)),
    onUpdateMarkscallData: (
      data,
      id,
      editing,
      setEditing,
      currentUser,
      setCurrentUser
    ) =>
      dispatch(
        actions.updateMarkscallData(
          data,
          id,
          editing,
          setEditing,
          currentUser,
          setCurrentUser
        )
      ),
    onEditMarkscallRow: (
      data,
      id,
      editing,
      setEditing,
      currentUser,
      setCurrentUser
    ) =>
      dispatch(
        actions.editMarkscallRow(
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
export default connect(mapStateToProps, mapDispatchToProps)(BodyLanguage);
