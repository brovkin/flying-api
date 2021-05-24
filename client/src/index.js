import React from "react";
import ReactDOM from "react-dom";
import Parrots from "./components/Parrots";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

ReactDOM.render(
  <Router>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/parrots">Parrots</Link>
        </li>
      </ul>
    </nav>
    <Switch>
      <Route path="/" exact>
        Home
      </Route>
      <Route path="/parrots">
        <Parrots />
      </Route>
    </Switch>
  </Router>,
  document.getElementById("root")
);
