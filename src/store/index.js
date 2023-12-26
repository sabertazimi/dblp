import { applyMiddleware, compose, createStore } from 'redux';
import { thunk as thunkMiddleware } from 'redux-thunk';
import createRootReducer from '../reducers';

const middleware = [];
middleware.push(thunkMiddleware);

const configureStore = preloadedState => {
  const store = createStore(
    createRootReducer(),
    preloadedState,
    compose(applyMiddleware(...middleware))
  );

  return store;
};

export default configureStore;
