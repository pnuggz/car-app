import React, { Component } from "react";
import Navigation from "../templates/navigation";
import LoginNav from "../templates/loginNav";

const ProfilePage = () => (
  <div className="container">
    <div className="row justify-content-md-center">
      <div className="col-md-">
        <Navigation />
      </div>
      <div className=".col-sm-">
        <LoginNav />
      </div>
    </div>
    <div id="home" className="row justify-content-md-center" />
  </div>
);

export default ProfilePage;
