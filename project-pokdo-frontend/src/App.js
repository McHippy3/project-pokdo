import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./components/HomePage";

import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <HomePage />} />
      </Switch>
    </Router>
  );
}

export default App;
