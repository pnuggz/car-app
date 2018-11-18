import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

const Navigation = () => (
  <nav id="navigation-site">
    <ul className="nav justify-content-center">
      <li className="nav-item">
        <Link className="nav-link" to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/how">
          How it Works
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/about">
          About
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/results">
          Results
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
