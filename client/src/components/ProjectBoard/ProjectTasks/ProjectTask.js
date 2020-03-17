import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProjectTask extends Component {
  render() {
    const {
      projectSequence,
      summary,
      acceptanceCriteria,
      priority
    } = this.props.projectTask;
    let priorityString;
    let priorityClass;
    if (priority === 1) {
      priorityClass = "bg-danger text-light";
      priorityString = "High";
    } else if (priority === 2) {
      priorityClass = "bg-warning text-light";
      priorityString = "Medium";
    } else {
      priorityClass = "bg-success text-light";
      priorityString = "Low";
    }
    return (
      <div className="card bg-light mb-3">
        <div className={`card-header ${priorityClass}`}>
          ID: {projectSequence} -- Priority: {priorityString}
        </div>
        <div className="card-body">
          <h5 className="card-title">{summary}</h5>
          <p className="card-text">{acceptanceCriteria}</p>
          <Link
            to={`/updateProjectTask/${this.props.id}/${projectSequence}`}
            className="card-link btn btn-primary"
          >
            Update
          </Link>
          <a href="#" className="card-link btn btn-primary">
            Delete
          </a>
        </div>
      </div>
    );
  }
}
export default ProjectTask;
