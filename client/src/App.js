import React from "react";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import UpdateProject from "./components/Project/UpdateProject";
import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
import { Provider } from "react-redux";
import store from "./store";
import AddProjectTask from "./components/ProjectBoard/ProjectTasks/AddProjectTask";
import UpdateProjectTask from "./components/ProjectBoard/ProjectTasks/UpdateProjectTask";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/addproject" component={AddProject} />
        <Route exact path="/updateproject/:id" component={UpdateProject} />
        <Route exact path="/projectBoard/:id" component={ProjectBoard} />
        <Route exact path="/addProjectTask/:id" component={AddProjectTask} />
        <Route
          exact
          path="/updateProjectTask/:id/:project_sequence"
          component={UpdateProjectTask}
        />
      </Router>
    </Provider>
  );
}

export default App;
