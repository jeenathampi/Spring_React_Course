import React from "react";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import UpdateProject from "./components/Project/UpdateProject";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/addproject" component={AddProject} />
        <Route exact path="/updateproject/:id" component={UpdateProject} />
      </Router>
    </Provider>
  );
}

export default App;
