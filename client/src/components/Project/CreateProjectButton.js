import React from "react";
import { Link } from "react-router-dom";

const CreateProjectButton = () => {
  return (
    <div style={{ margin: "80px 0px auto" }}>
      <Link to="/addproject" className="btn btn-primary">
        Create a Project
      </Link>
      <hr></hr>
    </div>
  );
};

export default CreateProjectButton;
