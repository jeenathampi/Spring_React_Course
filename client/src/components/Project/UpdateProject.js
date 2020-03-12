import React, { Component } from "react";
import { getProject, createProject } from "../../actions/projectActions";
import { connect } from "react-redux";
import classnames from "classnames";

class UpdateProject extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      projectName: "",
      projectIdentifier: "",
      description: "",
      start_date: "",
      end_date: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const updateProject = {
      id: this.state.id,
      projectName: this.state.projectName,
      projectIdentifier: this.state.projectIdentifier,
      description: this.state.description,
      start_date: this.state.start_date,
      end_date: this.state.end_date
    };
    this.props.createProject(updateProject, this.props.history);
  }
  componentWillReceiveProps(nextProps) {
    const {
      id,
      projectName,
      projectIdentifier,
      description,
      start_date,
      end_date
    } = nextProps.project.project;

    this.setState({
      id,
      projectName,
      projectIdentifier,
      description,
      start_date,
      end_date
    });
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getProject(id, this.props.history);
  }
  render() {
    const { projectName, description } = this.props.errors;
    return (
      <div style={{ width: "50%" }} className="container">
        <h1 style={{ textAlign: "center" }}>Update Project Form</h1>
        <hr></hr>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className={classnames("form-control", {
                "is-invalid": projectName
              })}
              placeholder="Project Name"
              name="projectName"
              value={this.state.projectName}
              onChange={this.onChange}
            />
            <small className="invalid-feedback form-text">{projectName}</small>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Unique Project ID"
              name="projectIdentifier"
              value={this.state.projectIdentifier}
              readOnly
            />
          </div>
          <div className="form-group">
            <textarea
              type="text"
              className={classnames("form-control", {
                "is-invalid": description
              })}
              placeholder="Project Description"
              name="description"
              value={this.state.description}
              onChange={this.onChange}
            />
            <small className="invalid-feedback form-text">{description}</small>
          </div>
          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              className="form-control"
              name="start_date"
              value={this.state.start_date}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>Estimated End Date</label>
            <input
              type="date"
              className="form-control"
              name="end_date"
              value={this.state.end_date}
              onChange={this.onChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ errors, project }) {
  return { errors, project };
}

export default connect(mapStateToProps, { getProject, createProject })(
  UpdateProject
);
