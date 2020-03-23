import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/securityActions";

class Header extends Component {
  onClick(e) {
    this.props.logout();
  }
  checkLoggedIn() {
    if (this.props.security.validToken) {
      return (
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
          </ul>
          <Link
            to="#"
            style={{ margin: "0px 10px 0px 0px" }}
            className="btn text-light"
          >
            <i class="fas fa-user"></i>
            <span> </span>
            {this.props.security.user.fullname}
          </Link>
          <Link
            to="/login"
            className="btn btn-outline-light"
            onClick={this.onClick.bind(this)}
          >
            Logout
          </Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link
            to="/register"
            style={{ margin: "0px 10px 0px 0px" }}
            className="btn btn-outline-light"
            type="submit"
          >
            Register
          </Link>
          <Link to="/login" className="btn btn-outline-light" type="submit">
            Login
          </Link>
        </div>
      );
    }
  }
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <nav className="container">
          <Link className="navbar-brand" to="/">
            Personal Project Management Tool
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {this.checkLoggedIn()}
        </nav>
      </nav>
    );
  }
}
function mapStateToProps({ security }) {
  return { security };
}
export default connect(mapStateToProps, { logout })(Header);
