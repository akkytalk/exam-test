import "./App.css";
import { HashRouter, Route, Switch } from "react-router-dom";

import { configureStore } from "./reduxStore/ConfigureStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";

import Login2 from "./Auth/Login2";
// import Home from "./Home/Home";

import DashboardLayout from "./Home/Dashboard/DashboardLayout";
import MainQuestion from "./Components/MainQuestion/MainQuestion";
import Marking from "./Components/Marking/Marking";
import Results from "./Components/Results/Results";
import Users from "./Components/Users/Users";
import Home from "./Home/Home";
import A1 from "./Components/Level/A1";
import A2 from "./Components/Level/A2";
import B1 from "./Components/Level/B1";
import B2 from "./Components/Level/B2";
import C1 from "./Components/Level/C1";
import C2 from "./Components/Level/C2";
import SubCategory from "./Components/Category/SubCategory/SubCats";
import MajorCats from "./Components/Category/MajorCats";

const { persistor, store } = configureStore();

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <HashRouter>
          <Switch>
            <Route exact path="/login" name="Login" component={Login2} />

            <Route path="/level-c2" name="Users" component={C2} />
            <Route path="/level-c1" name="Users" component={C1} />
            <Route path="/level-b2" name="Users" component={B2} />
            <Route path="/level-b1" name="Users" component={B1} />
            <Route path="/level-a2" name="Users" component={A2} />
            <Route path="/level-a1" name="Users" component={A1} />
            <Route path="/category" name="Category" component={MajorCats} />
            <Route
              path="/sub-category"
              name="Sub-Category"
              component={SubCategory}
            />
            <Route path="/results" name="Results" component={Results} />
            <Route path="/user" name="Users" component={Users} />
            <Route path="/marking" name="Marking" component={Marking} />
            <Route path="/run" name="Marking" component={Home} />
            <Route
              path="/questions"
              name="Questions"
              component={MainQuestion}
            />
            <Route path="/" component={DashboardLayout} />
          </Switch>
        </HashRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
