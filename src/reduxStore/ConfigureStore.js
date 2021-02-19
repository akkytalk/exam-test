import { createStore, applyMiddleware } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import thunk from "redux-thunk";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import Login from "./reducer/login";


const config = {
    key: "root",
    storage,
    debug: true
};


export const configureStore = () => {
    const store = createStore(
      persistCombineReducers(config, {
        login: Login,
    }),
    applyMiddleware(thunk, logger)
  );

  const persistor = persistStore(store);

  return { persistor, store };
}
