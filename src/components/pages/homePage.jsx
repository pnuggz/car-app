import React, { Component } from "react";
import Navigation from "../templates/navigation";
import LoginNav from "../templates/loginNav";

const HomePage = () => (
  <div className="container">
    <div id="navigation" className="row justify-content-md-center">
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
          <h1>Welcome</h1>
        </header>
      </div>
    </div>
  </div>
);

export default HomePage;
