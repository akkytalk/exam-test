import React, { useEffect, useState } from "react";
import * as actions from "../../reduxStore/actions";
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

function Users(props) {
  const accessToken = `${props.login?.login?.data?.token}`;

  let data = {
    token: accessToken,
  };

  console.log("data from user page", data);

  useEffect(() => {
    console.log("currentUser data from redux ", currentUser);

    props.onUsersGetData(data);

    props.onDeleteUsers(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("user data", props.users);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [editing, setEditing] = useState(false);

  const initialFormState = {
    id: "",
    name: "",
    email: "",
    password: "",
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
  console.log("user from user", user);
  console.log("CurrentUser from user", currentUser);
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

                <Typography color="textPrimary">Students</Typography>
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
                  <strong>Students</strong>
                  <Button className="btn-success  float-right" onClick={toggle}>
                    Add Student
                  </Button>
                  <Modal
                    className="modal-info modal-lg"
                    isOpen={modal}
                    toggle={toggle}
                  >
                    <ModalHeader toggle={toggle}>Add New Student</ModalHeader>
                    <ModalBody>
                      <form
                        onSubmit={(event) => {
                          event.preventDefault();
                          props.onPostUsersData(data, user);
                        }}
                      >
                        <div
                          className="form-row d-flex justify-content-center"
                          style={{ fontSize: "12px" }}
                        >
                          <div className="form-group col-md-8">
                            <label htmlFor="inputPassword4"> Name </label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputPassword4"
                              placeholder=""
                              value={!editing ? user.name : currentUser.name}
                              name="name"
                              onChange={
                                editing
                                  ? currentUserInputChange
                                  : handleInputChange
                              }
                            />
                          </div>

                          <div className="form-group col-md-8">
                            <label htmlFor="inputPassword4"> Email </label>
                            <input
                              type="email"
                              className="form-control"
                              id="inputPassword4"
                              placeholder=""
                              value={!editing ? user.email : currentUser.email}
                              name="email"
                              onChange={
                                editing
                                  ? currentUserInputChange
                                  : handleInputChange
                              }
                            />
                          </div>

                          <div className="form-group col-md-8">
                            <label htmlFor="inputPassword4"> Password</label>
                            <input
                              type="password"
                              className="form-control"
                              id="inputPassword4"
                              placeholder=""
                              value={
                                !editing ? user.password : currentUser.password
                              }
                              name="password"
                              onChange={
                                editing
                                  ? currentUserInputChange
                                  : handleInputChange
                              }
                            />
                          </div>

                          {/* <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4"> phone </label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputPassword4"
                              placeholder=""
                              value={
                                !editing ? user.address : currentUser.address
                              }
                              name="address"
                              onChange={
                                editing
                                  ? currentUserInputChange
                                  : handleInputChange
                              }
                            />
                          </div> */}

                          {/* <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4"> Opition 4 </label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputPassword4"
                              placeholder=""
                              value={!editing ? user.city : currentUser.city}
                              name="city"
                              onChange={
                                editing
                                  ? currentUserInputChange
                                  : handleInputChange
                              }
                            />
                          </div> */}

                          {/* <div className="form-group col-md-12">
                            <label htmlFor="inputPassword4">
                              {" "}
                              Instructions{" "}
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputPassword4"
                              placeholder=""
                              value={!editing ? user.state : currentUser.state}
                              name="state"
                              onChange={
                                editing
                                  ? currentUserInputChange
                                  : handleInputChange
                              }
                            />
                          </div> */}

                          {/* <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4"> pincode </label>
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
                                <button
                                  className="btn btn-success"
                                  type="button"
                                  onClick={() => {
                                    props.onUpdateUsersData(
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
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        {/* <th scope="col">phone</th> */}
                        {/* <th scope="col">Option 3</th>
                        <th scope="col">Option 4</th>
                        <th scope="col">Instructions</th> */}

                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {props.users?.data?.length > 0 ? (
                        props.users?.data?.map((user) => (
                          <tr key={user.id}>
                            {/* <td>{user.id}</td> */}
                            <td>{user.name}</td>
                            <td>{user.email}</td>

                            <td className="d-flex">
                              <Button
                                className="btn-warning p-1"
                                onClick={() => {
                                  props.onEditUsersRow(
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
                                      "Are you sure you wish to delete this Student?"
                                    )
                                  )
                                    props.onDeleteUsers(data, user.id);
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
    users: state.users.users,

    // form: state.form.form,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUsersGetData: (data) => dispatch(actions.usersGetData(data)),
    onDeleteUsers: (data, id) => dispatch(actions.deleteUsers(data, id)),
    onPostUsersData: (data, user) =>
      dispatch(actions.postUsersData(data, user)),
    onUpdateUsersData: (
      data,
      id,
      editing,
      setEditing,
      currentUser,
      setCurrentUser
    ) =>
      dispatch(
        actions.updateUsersData(
          data,
          id,
          editing,
          setEditing,
          currentUser,
          setCurrentUser
        )
      ),
    onEditUsersRow: (
      data,
      id,
      editing,
      setEditing,
      currentUser,
      setCurrentUser
    ) =>
      dispatch(
        actions.editUsersRow(
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
export default connect(mapStateToProps, mapDispatchToProps)(Users);
