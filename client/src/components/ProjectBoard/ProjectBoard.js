import React, { Component } from "react";
import CreateProjectTaskButton from "./ProjectTasks/CreateProjectTaskButton";
import Backlog from "./Backlog";
import { connect } from "react-redux";

class ProjectBoard extends Component {
  render() {
    const { id } = this.props.match.params;
    const renderAlertOrBacklog = () => {
      if (this.props.errors.projectNotFound) {
        return (
          <div className="alert alert-danger" role="alert">
            {this.props.errors.projectNotFound}
          </div>
        );
      } else {
        return <Backlog id={id} history={this.props.history} />;
      }
    };

    return (
      <div className="container">
        <CreateProjectTaskButton id={id} />
        {renderAlertOrBacklog()}
      </div>
    );
  }
}
function mapStatToProps({ errors }) {
  return { errors };
}
export default connect(mapStatToProps)(ProjectBoard);
