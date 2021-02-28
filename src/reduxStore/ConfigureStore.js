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
import majorcatsReducer from "./reducer/RMajorcats";
import subcatsReducer from "./reducer/RSubcats";
import optionsReducer from "./reducer/ROptions";

const config = {
  key: "exam",
  storage,
  debug: true,
};

export const configureStore = () => {
  const store = createStore(
    persistCombineReducers(config, {
      login: Login,
      accountGroup: accountGroupReducer,
      questions: questionsReducer,
      options: optionsReducer,
      users: usersReducer,
      markings: markingReducer,
      majorcats: majorcatsReducer,
      subcats: subcatsReducer,
    }),
    applyMiddleware(thunk, logger)
  );

  const persistor = persistStore(store);

  return { persistor, store };
};
