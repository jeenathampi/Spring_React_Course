import React from "react";
import { Link } from "react-router-dom";

const CreateProjectTaskButton = props => {
  return (
    <div style={{ margin: "20px auto" }}>
      <Link to={`/addProjectTask/${props.id}`} className="btn btn-primary">
        <i className="fas fa-plus-circle"></i> Create Project Task
      </Link>
      <hr></hr>
    </div>
  );
};
export default CreateProjectTaskButton;
