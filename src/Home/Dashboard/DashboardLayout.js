import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Row, Col, Button } from "reactstrap";
import Sidebar from "../Sidebar/Sidebar";
import Top from "./starter/Top";
import { connect } from "react-redux";
import { removeLogin } from "../../reduxStore/actions/LoginCreators";
import { withRouter } from "react-router-dom";
import BookingSummary from "./booking-summary/booking-summary";
import { removeSignup } from "../../reduxStore/actions";

function DashboardLayout(props) {
  const [redirect, setRedirect] = useState(false);

  async function handleLogout() {
    await props.removeLogin();

    await props.removeSignup();
    setRedirect(true);
  }

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to={"/login"} />;
    }
  };

  console.log("login token", props.login?.login);

  if (props.login?.login?.length === 0) {
    return <Redirect to={"/login"} />;
  } else if (
    props.login?.login?.user?.role === "Admin" ||
    props.login?.login?.user?.role === "faculty"
  ) {
    return (
      <Fragment>
        {renderRedirect()}
        <div className="wrapper">
          {/* Navbar */}
          <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            {/* Left navbar links */}
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-widget="pushmenu"
                  href="/"
                  role="button"
                >
                  <i className="fas fa-bars" />
                </a>
              </li>
              <li className="nav-item d-none d-sm-inline-block">
                <Link href="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item d-none d-sm-inline-block float-right">
                <Button className="btn-danger" onClick={() => handleLogout()}>
                  Logout
                </Button>
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
                <Row>
                  <Col className="mt-4">
                    <Top {...props} />
                  </Col>
                </Row>
                <Row>
                  {/* <Col sm={6} lg={8}>
                    <BookingSummary />
                  </Col> */}
                </Row>
                <Row>
                  <Col sm={12}></Col>
                </Row>
                <Row>
                  <Col sm={12}></Col>
                </Row>
              </div>
            </section>
          </div>
        </div>
      </Fragment>
    );
  } else {
    return <Redirect to={"/student"} />;
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    signup: state.signup,
  };
};

const mapDispatchToProps = (dispatch) => ({
  removeLogin: () => {
    dispatch(removeLogin());
  },
  removeSignup: () => {
    dispatch(removeSignup());
  },
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DashboardLayout)
);
