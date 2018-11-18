import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";

import checkAuthorization from "./check-auth";
import logout from "../../actions/logout";

let LoginNav = () => (
  <nav id="navigation-login">
    <ul className="nav justify-content-center">
      {checkAuthorization() === false ? (
        <li className="nav-item">
          <Link className="nav-link" to="/signup">
            Sign Up
          </Link>
        </li>
      ) : (
        <li className="nav-item">
          <Link className="nav-link" to="/profile">
            Profile
          </Link>
        </li>
      )}
      {checkAuthorization() === false ? (
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      ) : (
        <li className="nav-item">
          <Link className="nav-link" to="/logout">
            Logout
          </Link>
        </li>
      )}
    </ul>
  </nav>
);

const mapDispatchToProps = {
  logout: logout
};
LoginNav = connect(
  null,
  mapDispatchToProps
)(LoginNav);

export default LoginNav;
