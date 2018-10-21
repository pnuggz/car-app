/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Import the helpers.. that we'll make here in the next step
// import Messages from '../../containers/notifications/SignupSuccess'
// import Errors from '../../containers/notifications/SignupErrors'

import loginRequest from "../../actions/login";
import Errors from "./errors";
import Messages from "./messages";

class Login extends Component {
  // Redux Form will call this function with the values of our
  // Form fields "email" and "password" when the form is submitted
  // this will in turn call the action
  submit = values => {
    // we could just do signupRequest here with the static proptypes
    // but ESLint doesn't like that very much...
    this.props.loginRequest(values);
  };

  render() {
    // grab what we need from props.  The handleSubmit from ReduxForm
    // and the pieces of state from the global state.
    const {
      handleSubmit,
      login: { requesting, successful, messages, errors }
    } = this.props;

    return (
      <div className="container login">
        <div className="form-group">
          <div className="box-form">
            {/* Use the Submit handler with our own submit handler*/}
            <form id="login" onSubmit={handleSubmit(this.submit)}>
              <div className="signup-form">
                <div className="form-group">
                  <label htmlFor="username">
                    <h3>Username</h3>
                  </label>
                  <Field
                    name="username"
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    component="input"
                  />
                  <label htmlFor="password">
                    <h3>Password</h3>
                  </label>
                  <Field
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    component="input"
                  />
                </div>
                <button action="submit">LOGIN</button>
              </div>
            </form>
          </div>
          <div className="auth-messages">
            {!requesting && !!errors.length && <Errors errors={errors} />}
            {!requesting &&
              !!messages.length && <Messages messages={messages} />}
            {!requesting &&
              successful && (
                <div>
                  Login Successful!
                  {/* <Link to="/login">Click here to Login »</Link> */}
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}

// Pass the correct proptypes in for validation
Login.propTypes = {
  handleSubmit: PropTypes.func,
  loginRequest: PropTypes.func,
  login: PropTypes.shape({
    requesting: PropTypes.bool,
    successful: PropTypes.bool,
    messages: PropTypes.array,
    errors: PropTypes.array
  })
};

// Grab only the piece of state we need
const mapStateToProps = state => ({
  login: state.login
});

// Connect our component to redux and attach the "signup" piece
// of state to our "props" in the component.  Also attach the
// "signupRequest" action to our "props" as well.
const connected = connect(
  mapStateToProps,
  { loginRequest }
)(Login);

// Connect our connected component to Redux Form.  It will namespace
// the form we use in this component as "signup".
const formed = reduxForm({
  form: "login"
})(connected);

// // Export our well formed component!
export default formed;
