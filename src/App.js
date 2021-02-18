import "./App.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import { Fragment } from "react";
import Login2 from "./Auth/Login2";
import Home from "./Home/Home";

function App() {
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path="/" name="Login" component={Login2} />
          <Route exact path="/home" name="Home" component={Home} />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
