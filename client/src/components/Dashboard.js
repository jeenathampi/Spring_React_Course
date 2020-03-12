import React, { Component } from "react";
import ProjectItem from "./Project/ProjectItem";
import CreateProjectButton from "./Project/CreateProjectButton";
import { connect } from "react-redux";
import { getProjects } from "../actions/projectActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getProjects();
  }
  render() {
    const { projects } = this.props.project;
    return (
      <div className="container">
        <h1 style={{ textAlign: "center", margin: "30px auto" }}>Projects</h1>
        <CreateProjectButton />
        {projects.map(project => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>
    );
  }
}

function mapStateToProps({ project }) {
  return { project };
}
export default connect(mapStateToProps, { getProjects })(Dashboard);
