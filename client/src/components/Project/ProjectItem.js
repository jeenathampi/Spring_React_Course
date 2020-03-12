import React, { Component } from "react";

import { Link } from "react-router-dom";

class ProjectItem extends Component {
  renderProjects() {
    const { project } = this.props;
    return (
      <div key={project.id} className="card mb-3 bg-light">
        <div className="row no-gutters">
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{project.projectName}</h5>
              <p className="card-text">{project.description}</p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="card"
              style={{ width: "20rem", margin: "20px auto" }}
            >
              <ul className="list-group list-group-flush">
                <li className="list-group-item alert-primary">
                  <i className="fas fa-flag-checkered"></i> Project Board
                </li>
                <Link to={`/updateproject/${project.projectIdentifier}`}>
                  <li className="list-group-item alert-success">
                    <i className="fas fa-edit"></i> Update Project Info
                  </li>
                </Link>
                <li className="list-group-item alert-danger">
                  <i className="fas fa-minus-circle"></i> Delete Project
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
  render() {
    return <div>{this.renderProjects()}</div>;
  }
}

export default ProjectItem;
