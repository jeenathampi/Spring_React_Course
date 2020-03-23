import React, { Component } from "react";
import { connect } from "react-redux";
import { createNewUser } from "../../actions/securityActions";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      fullname: "",
      username: "",
      password: "",
      confirmPassword: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push("/dashboard");
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      fullname: this.state.fullname,
      username: this.state.username,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };
    console.log(user);
    this.props.createNewUser(user, this.props.history);
  }

  render() {
    const { password, fullname, username, confirmPassword } = this.props.errors;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your Account</p>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className={classnames("form-control", {
                    "is-invalid": fullname
                  })}
                  placeholder="Full Name"
                  name="fullname"
                  value={this.state.fullname}
                  onChange={this.onChange}
                />
                <small className="invalid-feedback form-text">{fullname}</small>
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className={classnames("form-control", {
                    "is-invalid": username
                  })}
                  placeholder="Email Address"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChange}
                />
                <small className="invalid-feedback form-text">{username}</small>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className={classnames("form-control", {
                    "is-invalid": password
                  })}
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                <small className="invalid-feedback form-text">{password}</small>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className={classnames("form-control", {
                    "is-invalid": confirmPassword
                  })}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={this.state.confirmPassword}
                  onChange={this.onChange}
                />
                <small className="invalid-feedback form-text">
                  {confirmPassword}
                </small>
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps({ errors, security }) {
  return { errors, security };
}

export default connect(mapStateToProps, { createNewUser })(Register);
