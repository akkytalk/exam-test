/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import * as actions from "../../reduxStore/actions";
import { connect } from "react-redux";
import axios from "axios";
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
import { baseUrl } from "../../shared/baseUrl";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

function Results(props) {
  const accessToken = `${props.login?.login?.data?.token}`;

  let data = {
    token: accessToken,
  };

  //console.log("data", data);

  useEffect(() => {
    //   console.log("currentUser data from redux ", currentUser);

    props.onMarkingsGetData(data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("markings", props.markings);

  const [user, setUser] = useState({
    user_name: "",
    email: "",
    weekly_result: "",
    BL: "",
    biodata: "",
    mock_interview: "",
    final_score: "",
    exam_result: "",
  });

  const [editing, setEditing] = useState(false);

  const initialFormState = {
    id: "",
    user_name: "",
    email: "",
    weekly_result: "",
    BL: "",
    biodata: "",
    mock_interview: "",
    final_score: "",
    exam_result: "",
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
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const toggle2 = () => {
    setModal2(!modal2);
    // setEditing(false);
  };

  const toggle3 = () => {
    setModal3(!modal3);
    // setEditing(false);
  };

  const authAxios = axios.create({
    baseURL: baseUrl,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const [testResult, setTestResult] = useState([]);

  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  async function ViewandleId(id) {
    console.log("User-id", id);
    authAxios
      .get(`/test/${id}`)
      .then((res) => {
        console.log("test response data", res.data);
        setTestResult(res.data);
        props.onMarkingsGetData(data);
      })
      .catch((err) => console.log(err));
  }

  const [searchButtonClick, setSearchButtonClick] = useState(false);

  const search = () => {
    setSearchButtonClick(true);

    const searchresult = props.markings?.mark?.filter((user) => {
      return (
        user?.user?.email
          ?.toLowerCase()
          .includes(searchTerm.trim().toLowerCase()) ||
        user?.user?.name
          ?.toLowerCase()
          .includes(searchTerm.trim().toLowerCase()) ||
        user?.user?.centre
          ?.toLowerCase()
          .includes(searchTerm.trim().toLowerCase())
      );
    });

    // console.log("searchresult", searchresult);
    setSearchResults(searchresult);
  };

  async function resultPdf() {
    const divToDisplay = document.getElementById("htmlToPdf2");
    html2canvas(divToDisplay).then(function (canvas) {
      console.log(canvas);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "Potrait",
      });
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      console.log(pdfHeight, pdfWidth);
      pdf.addImage(imgData, "PNG", 1, 1, pdfWidth, pdfHeight);
      pdf.save("download.pdf");
    });
  }

  // console.log("process.env", process.env);
  // console.log("test result", testResult);
  // console.log("result", searchTerm);
  //  console.log("search result", searchResults);

  console.log("marks call", props.markscall);
  console.log("marks by me", props.markings?.text);

  console.log("data from currentUser", currentUser);
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
                  <input
                    type="text"
                    placeholder="Search By Name, Email and Centre"
                    className="ml-5"
                    style={{ width: "500px" }}
                    value={searchTerm}
                    onChange={handleChange}
                  />
                  <Button className="btn-success ml-2" onClick={search}>
                    Search
                  </Button>
                  <Modal
                    className="modal-info modal-lg "
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
                              disabled
                              id="inputPassword4"
                              placeholder=""
                              value={
                                !editing
                                  ? user.user_name
                                  : currentUser.user_name
                              }
                              name="user_name"
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
                              disabled
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
                                !editing
                                  ? user.weekly_result
                                  : currentUser.weekly_result
                              }
                              name="weekly_result"
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
                              value={!editing ? user.BL : currentUser.BL}
                              name="BL"
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
                              value={
                                !editing ? user.biodata : currentUser.biodata
                              }
                              name="biodata"
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
                              value={
                                !editing
                                  ? user.mock_interview
                                  : currentUser.mock_interview
                              }
                              name="mock_interview"
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
                                !editing
                                  ? user.final_score
                                  : currentUser.final_score
                              }
                              name="final_score"
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
                              name="exam_result"
                              value={
                                editing
                                  ? currentUser.exam_result
                                  : user.exam_result
                              }
                              disabled
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
                                  onClick={() => {
                                    props.onUpdateMarkingsData(
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

                  <Modal
                    className="modal-info modal-lg"
                    isOpen={modal2}
                    toggle={toggle2}
                  >
                    <ModalHeader toggle={toggle2}>Add New Marking</ModalHeader>
                    <ModalBody>
                      <form>
                        <div className="form-row" style={{ fontSize: "12px" }}>
                          <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4"> Name </label>
                            <input
                              type="text"
                              className="form-control"
                              disabled
                              id="inputPassword4"
                              placeholder=""
                              value={testResult?.user?.name}
                              name="user_name"
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
                              disabled
                              placeholder=""
                              value={testResult?.user?.email}
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
                              Level A1 points
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputPassword4"
                              placeholder=""
                              value={testResult.$category_one}
                              name="weekly_result"
                              disabled
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
                              Level A2 points{" "}
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputPassword4"
                              placeholder=""
                              disabled
                              value={testResult.$category_two}
                              name="BL"
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
                              Level B1 points{" "}
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputPassword4"
                              placeholder=""
                              disabled
                              value={testResult.$category_three}
                              name="biodata"
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
                              Level B2 points{" "}
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputPassword4"
                              placeholder=""
                              disabled
                              value={testResult.$category_four}
                              name="mock_interview"
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
                              Level C1 points{" "}
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              id="inputPassword4"
                              placeholder=""
                              disabled
                              value={testResult.$category_five}
                              name="final_score"
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
                              Level C2 points{" "}
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputPassword4"
                              name="exam_result"
                              disabled
                              value={testResult.$category_six}
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
                              Total points{" "}
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputPassword4"
                              name="exam_result"
                              disabled
                              value={testResult.total}
                              onChange={
                                editing
                                  ? currentUserInputChange
                                  : handleInputChange
                              }
                            />
                          </div>

                          {/* <div className="form-group col-md-12 mt-4">
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
                                    onClick={() => {
                                      props.onUpdateMarkingsData(
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
                          </div> */}
                        </div>
                      </form>
                    </ModalBody>
                  </Modal>

                  <Modal
                    className="modal-info modal-lg"
                    isOpen={modal3}
                    toggle={toggle3}
                  >
                    <ModalHeader toggle={toggle3}>Result</ModalHeader>
                    <ModalBody id="htmlToPdf2">
                      <div className="d-flex">
                        <h5>Name :</h5>
                        <h5 className="ml-2">{currentUser?.user?.name}</h5>
                      </div>
                      <div className="d-flex">
                        <h5>email :</h5>
                        <h5 className="ml-2">{currentUser?.user?.email}</h5>
                      </div>
                      <div className="d-flex">
                        <h5>Enrollment No :</h5>
                        <h5 className="ml-2">{currentUser?.user?.reg_no}</h5>
                      </div>
                      <div>
                        <table className="table" style={{ fontSize: "15px" }}>
                          <thead>
                            <tr>
                              {/* <th>ID</th> */}
                              <th scope="col">Assesement</th>
                              <th scope="col">Criteria</th>
                              <th scope="col">Date</th>
                              <th scope="col">Marks</th>
                            </tr>
                          </thead>
                          <tbody>
                            {props.markscall.map((marks, index) => {
                              if (currentUser?.user?.id == marks?.user?.id)
                                return (
                                  <tr key={index}>
                                    <td>{marks?.assesement?.name}</td>
                                    <td>{marks?.criteria?.name}</td>
                                    <td>
                                      {marks?.date ? marks?.date : "No Date"}
                                    </td>
                                    <td>{marks?.marks}</td>
                                  </tr>
                                );
                            })}
                          </tbody>
                        </table>
                        <h5
                          style={{ textAlign: "center", marginBottom: "20px" }}
                        >
                          English Test Marks
                        </h5>
                        <table className="table" style={{ fontSize: "15px" }}>
                          <thead>
                            <tr>
                              {/* <th>ID</th> */}
                              <th scope="col">Level A1 </th>
                              <th scope="col">Level A2 </th>
                              <th scope="col">Level B1</th>
                              <th scope="col">Level B2</th>
                              <th scope="col">Level C1</th>
                              <th scope="col">Level C2</th>
                              <th scope="col">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr key={testResult?.id}>
                              <td>{testResult?.$category_one}</td>
                              <td>{testResult?.$category_two}</td>
                              <td>{testResult?.$category_three}</td>
                              <td>{testResult?.$category_four}</td>
                              <td>{testResult?.$category_five}</td>
                              <td>{testResult?.$category_six}</td>
                              <td>{testResult?.total}</td>
                            </tr>
                          </tbody>
                        </table>

                        <h5
                          style={{ textAlign: "center", marginBottom: "20px" }}
                        >
                          Total Marks
                        </h5>
                        <table className="table" style={{ fontSize: "15px" }}>
                          <thead>
                            <tr>
                              <th scope="col">English Mark</th>
                              <th scope="col">Weekly Result </th>
                              <th scope="col">Body Language </th>
                              <th scope="col">Note on Biodata</th>
                              <th scope="col">Mock Interviews</th>
                              <th scope="col">Final Score</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{testResult?.total}</td>
                              <td>{currentUser?.weekly_result}</td>
                              <td>{currentUser?.BL}</td>
                              <td>{currentUser?.biodata}</td>
                              <td>{currentUser?.mock_interview}</td>
                              <td>{currentUser?.final_score}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </ModalBody>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                        onClick={() => toggle3()}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={resultPdf}
                      >
                        save as pdf
                      </button>
                    </div>
                  </Modal>
                </CardHeader>

                <CardBody>
                  {/* {searchResults.length == 0 && "No search user available"} */}
                  <table
                    className="table table-sm"
                    style={{ fontSize: "12px" }}
                  >
                    <thead>
                      <tr>
                        {/* <th>ID</th> */}
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Centre</th>
                        <th scope="col">English Mark</th>
                        <th scope="col">Weekly Result </th>
                        <th scope="col">Body Language </th>
                        <th scope="col">Note on Biodata</th>
                        <th scope="col">Mock Interviews</th>
                        <th scope="col">Final Score</th>
                        <th scope="col">Exam Result </th>
                        {/* <th scope="col">Result Pdf</th> */}

                        {/* <th scope="col">Actions</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {searchResults?.length > 0 && searchButtonClick ? (
                        searchResults?.map((user) => (
                          <tr key={user.id}>
                            {/* <td>{user.id}</td> */}
                            <td>{user?.user?.name}</td>
                            <td>{user?.user?.email}</td>
                            <td>
                              {user?.user?.centre !== null
                                ? user?.user?.centre
                                : "No Centre"}
                            </td>

                            <td>{user?.exam_result}</td>
                            <td>{user?.weekly_result}</td>
                            <td>{user?.BL}</td>
                            <td>{user?.biodata}</td>
                            <td>{user?.mock_interview}</td>
                            <td>{user?.exam_result}</td>
                            <td>
                              <Button
                                className="btn-success"
                                onClick={() => {
                                  toggle2();
                                  ViewandleId(user.user_id);
                                }}
                              >
                                View
                              </Button>
                            </td>

                            {/* <td>
                              <Button
                                className="btn-warning"
                                onClick={() => {
                                  toggle3();
                                  ViewandleId(user.user_id);
                                  props.onEditMarkingsRow(
                                    data,
                                    user.id,
                                    editing,
                                    setEditing,
                                    currentUser,
                                    setCurrentUser
                                  );
                                }}
                              >
                                Result
                              </Button>
                            </td> */}

                            {/* <td className="d-flex">
                              <Button
                                className="btn-warning p-1"
                                onClick={() => {
                                  props.onEditMarkingsRow(
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
                              </Button> */}

                            {/* <Button
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
                              </Button> */}
                            {/* </td> */}
                          </tr>
                        ))
                      ) : (
                        <tr>{/* <td colSpan={3}>No users</td> */}</tr>
                      )}
                      {searchResults?.length == 0 && !searchButtonClick ? (
                        props.markings?.mark?.length > 0 ? (
                          props.markings?.mark?.map((user) => {
                            if (user.user !== null)
                              return (
                                <tr key={user.id}>
                                  {/* <td>{user.id}</td> */}
                                  <td>{user?.user?.name}</td>
                                  <td>{user?.user?.email}</td>
                                  <td>
                                    {user?.user?.centre !== null
                                      ? user?.user?.centre
                                      : "No Centre"}
                                  </td>
                                  <td>{user?.exam_result}</td>
                                  <td>{user?.weekly_result}</td>
                                  <td>{user?.BL}</td>
                                  <td>{user?.biodata}</td>
                                  <td>{user?.mock_interview}</td>
                                  <td>{user?.exam_result}</td>
                                  <td>
                                    <Button
                                      className="btn-success"
                                      onClick={() => {
                                        toggle2();
                                        ViewandleId(user.user_id);
                                      }}
                                    >
                                      View
                                    </Button>
                                  </td>

                                  {/* <td>
                                    <Button
                                      className="btn-warning"
                                      onClick={() => {
                                        toggle3();
                                        ViewandleId(user.user_id);
                                        props.onEditMarkingsRow(
                                          data,
                                          user.id,
                                          editing,
                                          setEditing,
                                          currentUser,
                                          setCurrentUser
                                        );
                                      }}
                                    >
                                      Result
                                    </Button>
                                  </td> */}

                                  {/* <td className="d-flex">
                              <Button
                                className="btn-warning p-1"
                                onClick={() => {
                                  props.onEditMarkingsRow(
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
                              </Button> */}

                                  {/* <Button
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
                              </Button> */}
                                  {/* </td> */}
                                </tr>
                              );
                          })
                        ) : (
                          <tr>
                            <td colSpan={3}>No users</td>
                          </tr>
                        )
                      ) : (
                        <tr>
                          <div></div>
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
    markscall: state.markscall.markscall,
    markings: state.markings.markings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMarkingsGetData: (data) => dispatch(actions.markingsGetData(data)),
    onMarkscallGetData: (data) => dispatch(actions.markscallGetData(data)),
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
