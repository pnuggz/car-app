import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";

import HomePage from "./components/pages/homePage";
import Login from "./components/templates/login";
import Signup from "./components/templates/signup";
import carLandingPage from "./components/pages/carLandingPage";

import {
  checkAppAuthorization,
  checkIndexAuthorization
} from "./components/templates/check-auth";

const store = configureStore();

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Switch>
        <Route
          exact={true}
          path="/"
          component={HomePage}
          onEnter={checkIndexAuthorization(store)}
        />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route
          onEnter={checkAppAuthorization(store)}
          path="/landing"
          component={carLandingPage}
        />
      </Switch>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
