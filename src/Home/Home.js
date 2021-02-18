import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect, useHistory } from "react-router";
import { Card, CardBody, CardHeader } from "reactstrap";
import { removeLogin } from "../reduxStore/actions/LoginCreators";
import { withRouter } from "react-router-dom";

import "./Home.css";
import axios from "axios";

// const accessToken =
//   "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiOTIzZjE0ZTQ5NTgyMTVkYzgxY2MyOWI4OTJkYjA3MWQwMDMyOGQ3ZjFiZWQ5ZjVmNmI5NDJkNmQxNzM5NjdkOTkzZjFkYjIzYmQxODliYjYiLCJpYXQiOiIxNjEzNjcxMjAyLjUwMTIwNSIsIm5iZiI6IjE2MTM2NzEyMDIuNTAxMjExIiwiZXhwIjoiMTY0NTIwNzIwMi40NzczNDQiLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.HQ9XBPnoGr4z5HE6fyNPXGw8C9Kq-OT63ZyCaxHhq4Cf2ApRsnem7eUOFvIDJbErNNX2BvT9-tYooJv_RNdRPYcAmM14XhLCy7Su4g1INP7EyT-rOvObh2kOfz6ttwncRsnGyH5sora1-qVUDTSOZ_46e8MkCmkfJ-1PcNnfKXbFYC9waOgOoMTAT6Z59k3y80heE16FpucmDlYzkYbGvCue03QwZYI58yqAD8yr0_TWwcdQRjvxcNW7Wo_PZWz_2AdjUaUuLWmMA_koYGy-RTko18ok4z-7DM0U8-ZX43NkLbU3p3D0W6ce8JbJGmuXD47x6kYbXSYpVJfAuJUSJMuUtKgpvwM9QieioDdmMI6A-nyUc_jjzbhYG6ahNZkHqYU3BOi5KaV79B_uYkS2HKUBABxCX6K2cnEw7_oh4hXnWVMH7QyJXMZOTLnxiCplmS11RDak5t087XhXofIXjB8MhqH5ab75Y93G_m7tHoAfraLnjqKXYlPY070sBoyDPPnotDeryCoh89QQBx0AW5MvTJ764RB1u5ngddBM7Vc1ggJLVJcKvYsSs7vAKwOvjRUE0dLWvKU7TjalRNUdC7TjULgKpnMTpq_AvNYby3H5LUbCSKy2dcBtFceL5_7a3jtSOG88S2fNQkgPd3ZyL0RfcHLbbQtA32YvRIBKWdg";

// const apiUrl = "https://uditsolutions.in/testify/public/api/";

// const authAxios = axios.create({
//   baseURL: apiUrl,
//   headers: {
//     Authorization: `Bearer ${accessToken}`,
//   },
// });

function Home(props) {
  const accessToken = `${props.login?.login?.data?.token}`;

  const apiUrl = "https://uditsolutions.in/testify/public/api/";

  const authAxios = axios.create({
    baseURL: apiUrl,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const [redirect, setRedirect] = useState(false);
  const [question, setQuestion] = useState([]);
  const [option, setOption] = useState([]);
  const [Category, setCategory] = useState([]);

  useEffect(() => {
    authAxios
      .get("/questions")
      .then((res) => {
        console.log("questions response data", res.data);
        setQuestion(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    authAxios
      .get("/options")
      .then((res) => {
        console.log("options response data", res.data);
        setOption(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    authAxios
      .get("/categories")
      .then((res) => {
        console.log("categories response data", res.data);
        setCategory(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log("question", question);
  console.log("cetorgy", Category);
  // console.log("usertoken", props.login?.login?.data?.token);

  async function handleLogout() {
    localStorage.removeItem("usertoken");
    await props.removeLogin();

    setRedirect(true);
  }

  return (
    <Fragment>
      {Category?.data?.map((Category) => (
        <div className="main-field">
          <Card className="question-card">
            <CardHeader>
              <strong>{Category.name}</strong>
            </CardHeader>
            <CardBody>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              sit amet suscipit erat, id auctor ipsum. Maecenas hendrerit sed
              odio a cursus. Aliquam elementum tempus sapien ut molestie. Nam
              non venenatis sapien. Sed vitae mattis ex, et pulvinar felis.
              Quisque vitae diam non felis facilisis iaculis aliquet quis nibh.
            </CardBody>
          </Card>
        </div>
      ))}
      <div className="main-field">
        <Card className="question-card">
          <CardHeader>
            <strong>Instructions</strong>
          </CardHeader>
          <CardBody>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            sit amet suscipit erat, id auctor ipsum. Maecenas hendrerit sed odio
            a cursus. Aliquam elementum tempus sapien ut molestie. Nam non
            venenatis sapien. Sed vitae mattis ex, et pulvinar felis. Quisque
            vitae diam non felis facilisis iaculis aliquet quis nibh.
          </CardBody>
        </Card>
      </div>

      <div className="main-field">
        <Card className="question-card">
          <CardHeader>
            <span> Category | Sub Category</span>
            <span className="float-right">Timer: 10s</span>
          </CardHeader>
          <CardBody>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            sit amet suscipit erat, id auctor ipsum. Maecenas hendrerit sed odio
            a cursus. Aliquam elementum tempus sapien ut molestie. Nam non
            venenatis sapien. Sed vitae mattis ex, et pulvinar felis. Quisque
            vitae diam non felis facilisis iaculis aliquet quis nibh.
          </CardBody>
        </Card>
      </div>
      {/* <button onClick={() => handleLogout()}> logout</button> */}
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => ({
  removeLogin: () => {
    dispatch(removeLogin());
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
