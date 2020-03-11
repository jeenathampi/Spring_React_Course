import React from "react";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddProject from "./components/Project/AddProject";

function App() {
  return (
    <Router>
      <Header />
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/addproject" component={AddProject} />
    </Router>
  );
}

export default App;
