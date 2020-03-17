import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProject } from "../../actions/projectActions";

class ProjectItem extends Component {
  handleDeleteClick = id => {
    this.props.deleteProject(id);
  };
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
                <Link to={`/projectBoard/${project.projectIdentifier}`}>
                  <li className="list-group-item alert-primary">
                    <i className="fas fa-flag-checkered"></i> Project Board
                  </li>
                </Link>
                <Link to={`/updateproject/${project.projectIdentifier}`}>
                  <li className="list-group-item alert-success">
                    <i className="fas fa-edit"></i> Update Project Info
                  </li>
                </Link>
                <Link to="#">
                  <li
                    className="list-group-item alert-danger"
                    onClick={this.handleDeleteClick.bind(
                      this,
                      project.projectIdentifier
                    )}
                  >
                    <i className="fas fa-minus-circle"></i> Delete Project
                  </li>
                </Link>
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

export default connect(null, { deleteProject })(ProjectItem);
