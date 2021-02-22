import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

function Sidebar() {
  return (
    <Fragment>
      {/* Main Sidebar Container */}
      <aside
        className="main-sidebar sidebar-dark-primary elevation-4"
        style={{ overflow: "scroll", width: "250px;", height: "100vh" }}
      >
        {/* Sidebar */}
        <div
          className="sidebar"
          style={{ paddingRight: "0px;", fontSize: "15px" }}
        >
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="dist/img/user2-160x160.jpg"
                className="img-circle elevation-2"
                alt="User pics"
              />
            </div>
            <div className="info">
              <a href="/" className="d-block">
                ADMIN
              </a>
            </div>
          </div>

          {/* SidebarSearch Form */}
          {/* Sidebar Menu */}
          <nav className="mt-2" id="MainMenu">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* Add icons to the links using the .nav-icon class
                             with font-awesome or any other icon font library */}
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <p>Dashboard</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/questions" className="nav-link">
                  <p>Questions</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="#"
                  className="nav-link d-flex justify-content-between"
                >
                  <p>Category</p>
                  <ArrowDropDownIcon fontSize="small" />
                </Link>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link
                      to="/sub-category"
                      className="nav-link d-flex justify-content-between"
                    >
                      <p>Sub Category</p>
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                    <Link
                      to="/vendor"
                      className="nav-link d-flex justify-content-between"
                    >
                      <p>Vendor</p>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/product" exact className="nav-link">
                      <p>Product</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/logistics" className="nav-link">
                      <p>Logistics</p>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/lc-master" className="nav-link">
                      <p>LC Master</p>
                    </Link>
                  </li> */}
                </ul>
              </li>

              <li className="nav-item">
                <Link to="/level" className="nav-link d-flex justify-content-between">
                  <p>Level</p>
                  <ArrowDropDownIcon fontSize="small" />
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link
                        to="customer"
                        className="nav-link d-flex justify-content-between"
                      >
                        <p>Sub Category</p>
                      </Link>
                    </li>
                    {/* <li className="nav-item">
                    <Link
                      to="/vendor"
                      className="nav-link d-flex justify-content-between"
                    >
                      <p>Vendor</p>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/product" exact className="nav-link">
                      <p>Product</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/logistics" className="nav-link">
                      <p>Logistics</p>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/lc-master" className="nav-link">
                      <p>LC Master</p>
                    </Link>
                  </li> */}
                  </ul>
                </Link>

              </li>

              <li className="nav-item">
                <Link to="/final-score" className="nav-link">
                  <p>Final Score</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/user" className="nav-link">
                  <p>User</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/face-to-face-interview" className="nav-link">
                  <p>Face to Face Interview</p>
                </Link>
              </li>

              {/* <li className="nav-item">
                <Link to="/statistics" className="nav-link">
                  <p>Statistics</p>
                </Link>
              </li> */}
            </ul>
          </nav>
        </div>
      </aside>
    </Fragment>
  );
}

export default Sidebar;
