import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getProjectTask,
  updateProjectTask
} from "../../../actions/backlogActions";
import classnames from "classnames";

class UpdateProjectTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      projectSequence: "",
      summary: "",
      acceptanceCriteria: "",
      status: "",
      priority: 0,
      dueDate: "",
      projectIdentifier: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const updatedProjectTask = {
      id: this.state.id,
      projectSequence: this.state.projectSequence,
      summary: this.state.summary,
      acceptanceCriteria: this.state.acceptanceCriteria,
      status: this.state.status,
      priority: this.state.priority,
      dueDate: this.state.dueDate,
      projectIdentifier: this.state.projectIdentifier
    };

    this.props.updateProjectTask(
      updatedProjectTask,
      this.state.projectIdentifier,
      this.state.projectSequence,
      this.props.history
    );
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidMount() {
    const { id, project_sequence } = this.props.match.params;
    this.props.getProjectTask(id, project_sequence, this.props.history);
  }
  componentWillReceiveProps(nextProps) {
    const {
      id,
      projectSequence,
      summary,
      acceptanceCriteria,
      status,
      priority,
      dueDate,
      projectIdentifier
    } = nextProps.projectTask;
    this.setState({
      id,
      projectSequence,
      summary,
      acceptanceCriteria,
      status,
      priority,
      dueDate,
      projectIdentifier
    });
  }
  render() {
    const { id } = this.props.match.params;
    const { summary } = this.props.errors;
    return (
      <div style={{ width: "50%" }} className="container">
        <h1 style={{ textAlign: "center" }}>Update Project Task</h1>
        <hr></hr>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className={classnames("form-control", {
                "is-invalid": summary
              })}
              placeholder="Project Task Summary"
              name="summary"
              value={this.state.summary}
              onChange={this.onChange}
            />
            <small className="invalid-feedback form-text">{summary}</small>
          </div>
          <div className="form-group">
            <textarea
              type="text"
              className="form-control"
              placeholder="Acceptance Criteria"
              name="acceptanceCriteria"
              value={this.state.acceptanceCriteria}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              className="form-control"
              name="dueDate"
              value={this.state.dueDate}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <select
              className="form-control"
              name="priority"
              value={this.state.priority}
              onChange={this.onChange}
            >
              <option value={0}>Select Priority</option>
              <option value={3}>Low</option>
              <option value={2}>Medium</option>
              <option value={1}>High</option>
            </select>
          </div>
          <div className="form-group">
            <select
              className="form-control"
              name="status"
              value={this.state.status}
              onChange={this.onChange}
            >
              <option value="">Select Status</option>
              <option value="TO_DO">To Do</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="DONE">Done</option>
            </select>
          </div>
          <Link
            to={`/projectBoard/${id}`}
            className="btn btn-primary float-left"
          >
            Back to Project Board
          </Link>
          <button type="submit" className="btn btn-primary float-right">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
function mapStateToProps({ errors, backlog: { projectTask } }) {
  return { errors, projectTask };
}
export default connect(mapStateToProps, { getProjectTask, updateProjectTask })(
  UpdateProjectTask
);
