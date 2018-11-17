import React from "react";
import ReactDOM from "react-dom";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/styles.css";

import HomePage from "./components/pages/homePage";
import Login from "./components/templates/login";
import Signup from "./components/templates/signup";
import carLandingPage from "./components/pages/carLandingPage";
import ProfilePage from "./components/pages/profilePage";
import Logout from "./components/templates/logout";

import checkAuthorization from "./components/templates/check-auth";
import history from "./lib/history";

const store = configureStore();

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <Switch>
        <Route
          exact={true}
          path="/"
          render={() =>
            checkAuthorization() ? <Redirect to="/landing" /> : <HomePage />
          }
        />
        <Route path="/home" component={HomePage} />
        <Route
          exact={true}
          path="/login"
          render={() =>
            checkAuthorization() ? <Redirect to="/profile" /> : <Login />
          }
        />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/signup" component={Signup} />
        <Route path="/landing" component={carLandingPage} />
        <Route path="/logout" component={Logout} />
      </Switch>
    </Provider>
  </Router>,
  document.getElementById("root")
);
