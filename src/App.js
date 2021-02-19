import "./App.css";
import { HashRouter, Route, Switch } from 'react-router-dom';


import { configureStore } from "./reduxStore/ConfigureStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";


import Login2 from "./Auth/Login2";
import Home from "./Home/Home";
import Home2 from "./Home/Home2";
import Form1 from "./Home/Form/Form1";
import Form2 from "./Home/Form/Form2";
import Form3 from "./Home/Form/Form3";
import Form4 from "./Home/Form/Form4";

const { persistor, store } = configureStore();

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <HashRouter>
          <Switch>
            <Route exact path="/login" name="Login" component={Login2} />
            {/* <Route exact path="/home" component={Home} /> */}
            {/* <Route exact path="/form1" name="form1" component={Form1} />
          <Route exact path="/form2" name="form1" component={Form2} />
          <Route exact path="/form3" name="form1" component={Form3} />
          <Route exact path="/form4" name="form1" component={Form4} /> */}
            <Route path="/" name="Home" component={Home} />

          </Switch>
        </HashRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
