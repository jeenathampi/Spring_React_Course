import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <nav className="container">
          <a className="navbar-brand" href="#">
            Personal Project Management Tool
          </a>
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

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/dashboard">
                  Dashboard
                </a>
              </li>
            </ul>
            <button
              style={{ margin: "0px 10px 0px 0px" }}
              className="btn btn-outline-light"
              type="submit"
            >
              Register
            </button>
            <button className="btn btn-outline-light" type="submit">
              Login
            </button>
          </div>
        </nav>
      </nav>
    );
  }
}

export default Header;
