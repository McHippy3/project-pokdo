import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./components/HomePage";

import "./App.css";
import CreatePage from "./components/CreatePage";
import EditPage from "./components/EditPage";
import ViewPage from "./components/ViewPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <HomePage />} />
        <Route exact path="/create"  render={() => <CreatePage />} />
        <Route exact path="/view/:id"  render={() => <ViewPage />} />
        <Route exact path="/edit/:id"  render={() => <EditPage />} />
      </Switch>
    </Router>
  );
}

export default App;
