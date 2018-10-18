import React, { Component } from "react";
import Navigation from "../templates/navigation";
import LoginNav from "../templates/loginNav";

const HomePage = () => (
  <div className="container">
    <div className="row justify-content-md-center">
      <div className="col-md-">
        <Navigation />
      </div>
      <div className=".col-sm-">
        <LoginNav />
      </div>
    </div>
    <div id="home" className="row justify-content-md-center">
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </div>
  </div>
);

export default HomePage;
