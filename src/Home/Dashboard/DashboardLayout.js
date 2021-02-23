import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Row, Col, Button } from "reactstrap";
import Sidebar from "../Sidebar/Sidebar";
import Top from "./starter/Top";
import { connect } from "react-redux";
import { removeLogin } from "../../reduxStore/actions/LoginCreators";
import { withRouter } from "react-router-dom";
import BookingSummary from "./booking-summary/booking-summary";

function DashboardLayout(props) {
  const [redirect, setRedirect] = useState(false);

  async function handleLogout() {
    await props.removeLogin();

    setRedirect(true);
  }

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to={"/login"} />;
    }
  };

  if (props.login?.login.length === 0) {
    return <Redirect to={"/login"} />;
  } else if (!props.login?.login.access_token) {
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
                  <Col sm={6} lg={8}>
                    <BookingSummary />
                  </Col>
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
    return <div>hello</div>;
  }
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DashboardLayout)
);
