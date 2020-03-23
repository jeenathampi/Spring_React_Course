import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../actions/securityActions";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const loginRequest = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.login(loginRequest);
  }

  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.security.validToken) {
      this.props.history.push("/dashboard");
    }
  }
  renderAlert() {
    if (this.props.errors.username === "Invalid username") {
      return (
        <div class="alert alert-danger" role="alert">
          Invalid username/password
        </div>
      );
    }
  }

  renderInvalidUsername() {
    if (this.props.errors.username !== "Invalid username") {
      return (
        <small className="invalid-feedback form-text">
          {this.props.errors.username}
        </small>
      );
    }
  }
  renderInvalidPassword() {
    if (this.props.errors.username !== "Invalid password") {
      return (
        <small className="invalid-feedback form-text">
          {this.props.errors.password}
        </small>
      );
    }
  }

  render() {
    const { username, password } = this.props.errors;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 my-3 mx-auto">
            {this.renderAlert()}
            <h1 className="display-4 text-center">Login</h1>
            <form onSubmit={this.onSubmit}>
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
                {this.renderInvalidUsername}
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
                {this.renderInvalidPassword}
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps({ security, errors }) {
  return { security, errors };
}

export default connect(mapStateToProps, { login })(Login);
