import React, { Component } from "react";
import ProjectItem from "./Project/ProjectItem";
import CreateProjectButton from "./Project/CreateProjectButton";

class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <h1 style={{ textAlign: "center", margin: "30px auto" }}>Projects</h1>
        <CreateProjectButton />
        <ProjectItem />
      </div>
    );
  }
}

export default Dashboard;
