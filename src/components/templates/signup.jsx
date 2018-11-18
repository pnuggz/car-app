import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import signupRequest from "../../actions/signup";
import Messages from "../templates/messages";
import Errors from "../templates/errors";

class Signup extends Component {
  submit = values => {
    this.props.signupRequest(values);
  };

  render() {
    const {
      handleSubmit,
      signup: { requesting, errors, messages, successful }
    } = this.props;

    return (
      <div className="container signup">
        <div className="form-group">
          <div className="box-form">
            <form className="Signup" onSubmit={handleSubmit(this.submit)}>
              <label htmlFor="first_name">
                <h3>First Name</h3>
              </label>
              <Field
                name="first_name"
                type="text"
                className="block input username"
                placeholder="First name"
                component="input"
              />
              <label htmlFor="last_name">
                <h3>Last Name</h3>
              </label>
              <Field
                name="last_name"
                type="text"
                className="block input username"
                placeholder="Last Name"
                component="input"
              />

              <label htmlFor="username">
                <h3>Username</h3>
              </label>
              <Field
                name="username"
                type="text"
                className="block input username"
                placeholder="Username"
                component="input"
              />
              <label htmlFor="email">
                <h3>Email</h3>
              </label>
              <Field
                name="email"
                type="text"
                className="block input username"
                placeholder="Email"
                component="input"
              />
              <label htmlFor="password">
                <h3>Password</h3>
              </label>

              <Field
                name="password"
                type="password"
                className="block input username"
                placeholder="Password"
                component="input"
              />
              <label htmlFor="password2">
                <h3>Password Confirmation</h3>
              </label>
              <Field
                name="password2"
                type="password"
                className="block input username"
                placeholder="Password"
                component="input"
              />

              <label htmlFor="address">
                <h3>Address</h3>
              </label>
              <Field
                name="address"
                type="text"
                className="block input username"
                placeholder="Address"
                component="input"
              />
              <label htmlFor="zipcode">
                <h3>Zipcode</h3>
              </label>
              <Field
                name="zipcode"
                type="text"
                className="block input username"
                placeholder="Zipcode"
                component="input"
              />

              <label htmlFor="mobilephone">
                <h3>Phone Number</h3>
              </label>
              <Field
                name="mobilephone"
                type="text"
                className="block input username"
                placeholder="Phone Number"
                component="input"
              />
              <label htmlFor="birthday">
                <h3>Birthday</h3>
              </label>
              <Field
                name="birthday"
                type="date"
                className="birthday"
                placeholder="block input username"
                component="input"
              />

              <label htmlFor="gender">
                <h3>Gender</h3>
              </label>
              <label htmlFor="gender">
                Male
                <Field
                  name="gender"
                  type="radio"
                  className="gender"
                  value="0"
                  component="input"
                />
              </label>
              <label htmlFor="gender">
                Female
                <Field
                  name="gender"
                  type="radio"
                  className="gender"
                  value="1"
                  component="input"
                />
              </label>
              <label htmlFor="subscribe">
                <h3>Subscription</h3>
              </label>
              <label htmlFor="subscribe">
                Yes
                <Field
                  name="subscribe"
                  type="radio"
                  className="subscribe"
                  value="0"
                  component="input"
                />
              </label>
              <label htmlFor="subscribe">
                No
                <Field
                  name="subscribe"
                  type="radio"
                  className="subscribe"
                  value="1"
                  component="input"
                />
              </label>
              <button className="btn btn-primary" action="submit">
                SIGNUP
              </button>
            </form>

            <div className="auth-messages">
              {!requesting && !!errors.length && (
                <Errors message="Failure to signup due to:" errors={errors} />
              )}
              {!requesting && !!messages.length && (
                <Messages messages={messages} />
              )}
              {!requesting && successful && (
                <div>
                  Signup Successful!
                  {/* <Link to="/login">Click here to Login »</Link> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  handleSubmit: PropTypes.func,
  signupRequest: PropTypes.func,
  signup: PropTypes.shape({
    requesting: PropTypes.bool,
    successful: PropTypes.bool,
    messages: PropTypes.array,
    errors: PropTypes.array
  })
};

const mapStateToProps = state => ({
  signup: state.signup
});

const connected = connect(
  mapStateToProps,
  { signupRequest }
)(Signup);

const formed = reduxForm({
  form: "Signup"
})(connected);

export default formed;
