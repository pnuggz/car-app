import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Navigation from "../templates/navigation";
import LoginNav from "../templates/loginNav";

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
      <div id="app-container">
        <div className="fixed">
          <div className="row navigation">
            <div className="col-md-">
              <Navigation />
            </div>
            <div className=".col-sm-">
              <LoginNav />
            </div>
          </div>
        </div>
        <div id="signup-form-group">
          <div className="wrapper">
            <div className="form-header">Car-App.</div>
            <div className="box-form">
              <form className="Signup" onSubmit={handleSubmit(this.submit)}>
                <div className="container-wrapper">
                  <div className="container-1">
                    <Field
                      name="first_name"
                      type="text"
                      className="block input username"
                      placeholder="First name"
                      component="input"
                    />
                    <Field
                      name="username"
                      type="text"
                      className="block input username"
                      placeholder="Username"
                      component="input"
                    />

                    <Field
                      name="password"
                      type="password"
                      className="block input username"
                      placeholder="Password"
                      component="input"
                    />
                    <Field
                      name="address"
                      type="text"
                      className="block input username"
                      placeholder="Address"
                      component="input"
                    />
                    <Field
                      name="mobilephone"
                      type="text"
                      className="block input username"
                      placeholder="Phone Number"
                      component="input"
                    />
                    <label htmlFor="gender">
                      <h3>Gender</h3>
                    </label>
                    <br />
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
                  </div>
                  <div className="container-2">
                    <Field
                      name="last_name"
                      type="text"
                      className="block input username"
                      placeholder="Last Name"
                      component="input"
                    />
                    <Field
                      name="email"
                      type="text"
                      className="block input username"
                      placeholder="Email"
                      component="input"
                    />
                    <Field
                      name="password2"
                      type="password"
                      className="block input username"
                      placeholder="Password"
                      component="input"
                    />
                    <Field
                      name="zipcode"
                      type="text"
                      className="block input username"
                      placeholder="Zipcode"
                      component="input"
                    />
                    <Field
                      name="birthday"
                      type="date"
                      className="block input username date"
                      placeholder="DD/MM/YYYY"
                      component="input"
                    />
                    <label htmlFor="subscribe">
                      <h3>Subscription</h3>
                    </label>
                    <br />
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
                  </div>
                </div>
                <br />
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
