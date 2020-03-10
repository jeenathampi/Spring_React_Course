import React, { Component } from "react";
import ProjectItem from "./Project/ProjectItem";

class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <h1 style={{ textAlign: "center", margin: "30px auto" }}>Projects</h1>
        <div style={{ margin: "80px 0px auto" }}>
          <button className="btn btn-primary">Create a Project</button>
          <hr></hr>
        </div>
        <ProjectItem />
      </div>
    );
  }
}

export default Dashboard;
