import React, { Component } from "react";
import ProjectTask from "./ProjectTasks/ProjectTask";
import { connect } from "react-redux";
import { getBacklog } from "../../actions/backlogActions";

class Backlog extends Component {
  componentDidMount() {
    this.props.getBacklog(this.props.id, this.props.history);
  }
  renderTodoTask() {
    const tasks = this.props.projectTasks.filter(
      projectTask => projectTask.status === "TO_DO"
    );
    return tasks.map(projectTask => (
      <ProjectTask
        key={projectTask.id}
        id={this.props.id}
        projectTask={projectTask}
      />
    ));
  }

  renderInProgressTask() {
    const tasks = this.props.projectTasks.filter(
      projectTask => projectTask.status === "IN_PROGRESS"
    );
    return tasks.map(projectTask => (
      <ProjectTask
        key={projectTask.id}
        id={this.props.id}
        projectTask={projectTask}
      />
    ));
  }

  renderDoneTask() {
    const tasks = this.props.projectTasks.filter(
      projectTask => projectTask.status === "DONE"
    );
    return tasks.map(projectTask => (
      <ProjectTask
        key={projectTask.id}
        id={this.props.id}
        projectTask={projectTask}
      />
    ));
  }
  render() {
    return (
      <div className="row">
        <div className="col-sm-4">
          <div className="card">
            <div className="card-header bg-primary text-white text-center">
              To Do
            </div>
          </div>
          {this.renderTodoTask()}
        </div>
        <div className="col-sm-4">
          <div className="card">
            <div className="card-header bg-primary text-white text-center">
              In Progress
            </div>
          </div>
          {this.renderInProgressTask()}
        </div>
        <div className="col-sm-4">
          <div className="card">
            <div className="card-header bg-primary text-white text-center">
              Done
            </div>
          </div>
          {this.renderDoneTask()}
        </div>
      </div>
    );
  }
}
function mapStateToProps({ backlog: { projectTasks } }) {
  return { projectTasks };
}

export default connect(mapStateToProps, { getBacklog })(Backlog);
