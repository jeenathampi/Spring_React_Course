import React from "react";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import UpdateProject from "./components/Project/UpdateProject";
import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
import { Provider } from "react-redux";
import store from "./store";
import AddProjectTask from "./components/ProjectBoard/ProjectTasks/AddProjectTask";
import UpdateProjectTask from "./components/ProjectBoard/ProjectTasks/UpdateProjectTask";
import Landing from "./components/Layout/Landing";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import jwt_decode from "jwt-decode";
import setJwtToken from "./securityUtils/setJwtToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";
import SecuredRoute from "./securityUtils/SecuredRoute";

const jwtToken = localStorage.getItem("jwtToken");
if (jwtToken) {
  setJwtToken(jwtToken);
  const decoded = jwt_decode(jwtToken);
  store.dispatch({ type: SET_CURRENT_USER, payload: decoded });
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Switch>
          <SecuredRoute exact path="/dashboard" component={Dashboard} />
          <SecuredRoute exact path="/addproject" component={AddProject} />
          <SecuredRoute
            exact
            path="/updateproject/:id"
            component={UpdateProject}
          />
          <SecuredRoute
            exact
            path="/projectBoard/:id"
            component={ProjectBoard}
          />
          <SecuredRoute
            exact
            path="/addProjectTask/:id"
            component={AddProjectTask}
          />
          <SecuredRoute
            exact
            path="/updateProjectTask/:id/:project_sequence"
            component={UpdateProjectTask}
          />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
