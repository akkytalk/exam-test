import { createStore, applyMiddleware } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import thunk from "redux-thunk";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import Login from "./reducer/login";
import accountGroupReducer from "./reducer/RAccountGroup";
import questionsReducer from "./reducer/RQuestions";
import usersReducer from "./reducer/RUser";
import markingReducer from "./reducer/RMarkings";

const config = {
  key: "root",
  storage,
  debug: true,
};

export const configureStore = () => {
  const store = createStore(
    persistCombineReducers(config, {
      login: Login,
      accountGroup: accountGroupReducer,
      questions: questionsReducer,
      userstest: usersReducer,
      markings: markingReducer,
    }),
    applyMiddleware(thunk, logger)
  );

  const persistor = persistStore(store);

  return { persistor, store };
};
