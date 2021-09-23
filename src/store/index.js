import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createRootReducer from '../reducers';

const middleware = [];

middleware.push(thunkMiddleware);

// apply logger middleware when development
// looger middleware must be placed at last posision
if (process.env.NODE_ENV === 'development') {
  const loggerMiddleware = createLogger();
  middleware.push(loggerMiddleware);
}

const configureStore = preloadedState => {
  const store = createStore(
    createRootReducer(),
    preloadedState,
    compose(applyMiddleware(...middleware))
  );

  return store;
};

export default configureStore;
