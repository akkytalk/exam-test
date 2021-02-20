import "./App.css";
import { HashRouter, Route, Switch } from "react-router-dom";

import { configureStore } from "./reduxStore/ConfigureStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";

import Login2 from "./Auth/Login2";
import Home from "./Home/Home";

const { persistor, store } = configureStore();

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <HashRouter>
          <Switch>
            <Route exact path="/login" name="Login" component={Login2} />

            <Route path="/" name="Home" component={Home} />
          </Switch>
        </HashRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
