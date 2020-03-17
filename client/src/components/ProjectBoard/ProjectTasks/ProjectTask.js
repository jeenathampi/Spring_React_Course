import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteProjectTask } from "../../../actions/backlogActions";

class ProjectTask extends Component {
  handleDelete = (id, project_sequence) => {
    this.props.deleteProjectTask(id, project_sequence);
  };
  render() {
    const {
      projectSequence,
      summary,
      acceptanceCriteria,
      priority,
      projectIdentifier
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
          <Link
            to="#"
            className="card-link btn btn-primary"
            onClick={this.handleDelete.bind(
              this,
              projectIdentifier,
              projectSequence
            )}
          >
            Delete
          </Link>
        </div>
      </div>
    );
  }
}
export default connect(null, { deleteProjectTask })(ProjectTask);
