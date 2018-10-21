import React, { Component } from "react";
import { connect } from "react-redux";

class Logout extends Component {
  componentWillMount() {
    this.props.logout();
  }

  render() {
    return null;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: function() {
      return dispatch({ type: "CLIENT_UNSET" });
    }
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Logout);
