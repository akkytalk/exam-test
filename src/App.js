
import './App.css';
import { HashRouter , Route, Switch } from "react-router-dom";
import Login from './Auth/Login';
import { Fragment } from 'react';
import Login2 from './Auth/Login2';
import Home from './Home/Home';


function App() {
  return (
    <Fragment>
      
      <HashRouter>
        <Switch>

          <Route exact path="/login" name="Login" component={Login2} />
          <Route exact path="/home" name="Home" component={Home} />
        </Switch>
      </HashRouter>

        
    </Fragment>
  );
}

export default App;
