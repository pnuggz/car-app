import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Navigation from "../templates/navigation";
import LoginNav from "../templates/loginNav";

import checkAuthorization from "../templates/check-auth";
import history from "../../lib/history";

import loadUser from "../../actions/user";

class CarLandingPage extends Component {
  componentWillMount() {
    if (checkAuthorization() === false) {
      history.push("/login");
    }

    this.props.loadUser();
  }

  render() {
    const { user } = this.props;

    return (
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
              {user.firstname ? <p>Welcome {user.firstname}</p> : <p />}
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
  }
}

CarLandingPage.propTypes = {
  user: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.user.userInfo
});

function mapDispatchToProps(dispatch) {
  return {
    loadUser: function() {
      return dispatch(loadUser());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CarLandingPage);
