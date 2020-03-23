import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const SecuredRoute = ({ component: Component, security, ...otherProps }) => (
  <Route
    {...otherProps}
    render={props =>
      security.validToken === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

function mapStateToProps({ security }) {
  return { security };
}
export default connect(mapStateToProps)(SecuredRoute);
