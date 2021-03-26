import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import axios from "axios";
import { baseUrl } from "../../../shared/baseUrl";

function Top(props) {
  const accessToken = `${props.login?.login?.data?.token}`;
  const authAxios = axios.create({
    baseURL: baseUrl,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const [userCount, setUserCount] = useState("");

  useEffect(() => {
    if (props.login?.login?.data?.token) {
      authAxios
        .get("userCount")
        .then((res) => {
          console.log("test counter data", res.data);
          setUserCount(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [userCount]);
  console.log("user count", userCount);
  return (
    <div className="row">
      {/* <div className="col-sm-12 col-md-4 col-lg-4">
          <Card outline color="success">
            <CardHeader className="bg-warning text-white">
              <h6 className="mb-0">Students</h6>
            </CardHeader>
            <CardBody>
              <h2 className="mb-0">18</h2>
            </CardBody>
            <CardFooter>
              <h6>Total number of students</h6>
            </CardFooter>
          </Card>
        </div> */}
      <div className="col-sm-12 col-md-4 col-lg-4">
        <Card>
          <CardHeader className="bg-danger text-white">
            <h6 className="mb-0">Exam Appeared</h6>
          </CardHeader>
          <CardBody>
            <h2 className="mb-0">{userCount}</h2>
          </CardBody>
          <CardFooter>
            <h6>Total number of students</h6>
          </CardFooter>
        </Card>
      </div>
      {/* <div className="col-sm-12 col-md-4 col-lg-4">
          <Card>
            <CardHeader className="bg-info text-white">
              <h6 className="mb-0">Students</h6>
            </CardHeader>
            <CardBody>
              <h2 className="mb-0">3</h2>
            </CardBody>
            <CardFooter>
              <h6>Total number of students</h6>
            </CardFooter>
          </Card>
        </div> */}
      {/* <div className="col-sm-12 col-md-3 col-lg-3">
          <Card>
            <CardHeader className="bg-success text-white">
              <h6 className="mb-0">Invoice</h6>
            </CardHeader>
            <CardBody>
              <h2 className="mb-0">35</h2>
            </CardBody>
            <CardFooter>
              <h6>Pending</h6>
            </CardFooter>
          </Card>
        </div> */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    signup: state.signup,
  };
};

const mapDispatchToProps = (dispatch) => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Top));
