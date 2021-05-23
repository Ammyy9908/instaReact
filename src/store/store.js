import {createStore,combineReducers,applyMiddleware,compose} from "redux";
import thunk from "redux-thunk";
import {createLogger} from "redux-logger";
import UserReducer from "../reducer/UserReducer";
import UIReducer from "../reducer/UiReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// CREATE A LOGGER

const logger = createLogger();

const middlewares = [thunk, logger];

const configureStore = () => {
  const store = createStore(
    combineReducers({
      
      userReducer: UserReducer,
      UIReducer:UIReducer
      
    }),
    composeEnhancers(applyMiddleware(...middlewares))
  );
  return store;
};

export default configureStore;