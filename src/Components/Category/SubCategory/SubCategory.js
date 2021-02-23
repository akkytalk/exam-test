import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../../Home/Sidebar/Sidebar";

function SubCategory() {
  return (
    <Fragment>
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
          </ul>
          {/* SEARCH FORM */}
        </nav>
        {/* /.navbar */}
        {/*  */}

        <Sidebar />
        {/* <div class="content-wrapper">
          <section className="content">
            <div className="container-fluid">
              
            </div>
          </section>
        </div> */}
      </div>
    </Fragment>
  );
}

export default SubCategory;
