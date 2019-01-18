import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createRootReducer from '../reducers';

const loggerMiddleware = createLogger();

const configureStore = (preloadedState) => {
  const store = createStore(
    createRootReducer(),
    preloadedState,
    compose(
      applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,
      ),
    ),
  );

  return store;
};

export default configureStore;
