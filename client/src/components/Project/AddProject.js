import React, { Component } from "react";
import { connect } from "react-redux";
import { createProject } from "../../actions/projectActions";

class AddProject extends Component {
  constructor() {
    super();
    this.state = {
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
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newProject = {
      projectName: this.state.projectName,
      projectIdentifier: this.state.projectIdentifier,
      description: this.state.description,
      start_date: this.state.start_date,
      end_date: this.state.end_date
    };
    this.props.createProject(newProject, this.props.history);
  }
  render() {
    return (
      <div style={{ width: "50%" }} className="container">
        <h1 style={{ textAlign: "center" }}>Create Project Form</h1>
        <hr></hr>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Project Name"
              name="projectName"
              value={this.state.projectName}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Unique Project ID"
              name="projectIdentifier"
              value={this.state.projectIdentifier}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <textarea
              type="text"
              className="form-control"
              placeholder="Project Description"
              name="description"
              value={this.state.description}
              onChange={this.onChange}
            />
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

export default connect(null, { createProject })(AddProject);
