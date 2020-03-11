import React, { Component } from "react";

class ProjectItem extends Component {
  render() {
    return (
      <div>
        <div className="card mb-3 bg-light">
          <div className="row no-gutters">
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Spring/React Project</h5>
                <p className="card-text">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
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
                  <li className="list-group-item alert-primary">
                    <i className="fas fa-flag-checkered"></i> Project Board
                  </li>
                  <li className="list-group-item alert-success">
                    <i className="fas fa-edit"></i> Update Project Info
                  </li>
                  <li className="list-group-item alert-danger">
                    <i className="fas fa-minus-circle"></i> Delete Project
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProjectItem;
