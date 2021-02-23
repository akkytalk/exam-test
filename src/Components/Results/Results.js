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

function Results(props) {
  const accessToken = `${props.login?.login?.data?.token}`;

  let data = {
    token: accessToken,
  };

  console.log("data", data);

  useEffect(() => {
    console.log("currentUser data from redux ", currentUser);

    props.onMarkingsGetData(data);

    props.onMarkingsGetData(data);
    props.onDeleteMarkings(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("markings", props.markings);

  const [user, setUser] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    status: "",
  });

  const [editing, setEditing] = useState(false);

  const initialFormState = {
    id: "",
    name: "",
    email: "",
    contact: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    status: "",
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
  };

  const EditHandle = () => {
    setModal(!modal);
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
                {/* <Link color="inherit">Master</Link> */}

                <Typography color="textPrimary">Results</Typography>
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
                  <strong>Results</strong>
                  {/* <Button className="btn-success  float-right" onClick={toggle}>
                    Add Marking
                  </Button> */}
                  <Modal
                    className="modal-info modal-lg"
                    isOpen={modal}
                    toggle={toggle}
                  >
                    <ModalHeader toggle={toggle}>Add New Marking</ModalHeader>
                    <ModalBody>
                      <form
                        onSubmit={(event) => {
                          event.preventDefault();
                          props.onPostMarkingsData(data, user);
                        }}
                      >
                        <div className="form-row" style={{ fontSize: "12px" }}>
                          <div className="form-group col-md-6">
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

                          <div className="form-group col-md-6">
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

                          <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">
                              {" "}
                              Weekly Result
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputPassword4"
                              placeholder=""
                              value={
                                !editing ? user.contact : currentUser.contact
                              }
                              name="contact"
                              onChange={
                                editing
                                  ? currentUserInputChange
                                  : handleInputChange
                              }
                            />
                          </div>

                          <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">
                              {" "}
                              Body Language{" "}
                            </label>
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
                          </div>

                          <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">
                              {" "}
                              Note on Biodata{" "}
                            </label>
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
                          </div>

                          <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">
                              {" "}
                              Mock Interviews{" "}
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
                          </div>

                          <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">
                              {" "}
                              Final Score{" "}
                            </label>
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
                            <label htmlFor="inputPassword4">
                              {" "}
                              Exam Result{" "}
                            </label>
                            <input
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
                            />
                            {/* <option>select</option>
                              <option value="1">active</option>
                              <option value="0">inactive</option>
                            </select> */}
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
                                  <Button type="button" color="primary" block>
                                    Submit
                                  </Button>
                                </Col>
                              </Row>
                            ) : (
                              <div className="d-flex">
                                <button
                                  className="btn btn-success"
                                  type="button"
                                  // onClick={() =>
                                  //   props.onUpdateMarkingsData(
                                  //     data,
                                  //     currentUser.id,
                                  //     editing,
                                  //     setEditing,
                                  //     currentUser,
                                  //     setCurrentUser
                                  //   )
                                  // }
                                >
                                  Update
                                </button>
                                <button
                                  className="btn btn-primary ml-3"
                                  type="button"
                                  onClick={() => setEditing(false)}
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
                        <th scope="col">Weekly Result </th>
                        <th scope="col">Body Language </th>
                        <th scope="col">Note on Biodata</th>
                        <th scope="col">Mock Interviews</th>
                        <th scope="col">Final Score</th>
                        <th scope="col">Exam Result </th>

                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {props.markings?.length > 0 ? (
                        props.markings?.map((user) => (
                          <tr key={user.id}>
                            {/* <td>{user.id}</td> */}
                            <td>{user?.user?.name}</td>
                            <td>{user?.user?.email}</td>
                            <td>{user?.weekly_result}</td>
                            <td>{user?.BL}</td>
                            <td>{user?.biodata}</td>
                            <td>{user?.mock_interview}</td>
                            <td>{user?.final_score}</td>
                            <td>{user?.exam_result}</td>

                            <td className="d-flex">
                              <Button
                                className="btn-warning p-1"
                                onClick={EditHandle}
                                // onClick={() =>
                                //   props.onEditMarkingsRow(
                                //     data,
                                //     user.id,
                                //     editing,
                                //     setEditing,
                                //     currentUser,
                                //     setCurrentUser
                                //   )
                                // }
                              >
                                <i
                                  className="fa fa-edit"
                                  aria-hidden="true"
                                ></i>
                              </Button>

                              <Button
                                className="btn-danger p-1 ml-3"
                                // onClick={() => {
                                //   if (
                                //     window.confirm(
                                //       "Are you sure you wish to delete this Account Group?"
                                //     )
                                //   )
                                //     props.onDeleteMarkings(data, user.id);
                                // }}
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

    markings: state.markings.markings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMarkingsGetData: (data) => dispatch(actions.markingsGetData(data)),

    onDeleteMarkings: (data, id) => dispatch(actions.deleteMarkings(data, id)),
    onPostMarkingsData: (data, user) =>
      dispatch(actions.postMarkingsData(data, user)),
    onUpdateMarkingsData: (
      data,
      id,
      editing,
      setEditing,
      currentUser,
      setCurrentUser
    ) =>
      dispatch(
        actions.updateMarkingsData(
          data,
          id,
          editing,
          setEditing,
          currentUser,
          setCurrentUser
        )
      ),
    onEditMarkingsRow: (
      data,
      id,
      editing,
      setEditing,
      currentUser,
      setCurrentUser
    ) =>
      dispatch(
        actions.editMarkingsRow(
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
export default connect(mapStateToProps, mapDispatchToProps)(Results);
