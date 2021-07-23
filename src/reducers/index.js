import { combineReducers } from 'redux';
import * as ActionTypes from '../constants';
import { DEFAULT_VENUES_LIST } from '../api';

const createReducer = (initialState, handlers) => (state = initialState, action) => {
  if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
    return handlers[action.type](state, action);
  }

  return state;
};

const filter = createReducer({
  venues: DEFAULT_VENUES_LIST,
  year: new Date().getFullYear() - 7,
}, {
  [ActionTypes.FILTER_VENUE]: (state, { payload }) => {
    const { venues } = payload;

    return {
      ...state,
      venues,
    };
  },
  [ActionTypes.FILTER_YEAR]: (state, { payload }) => {
    const { year } = payload;

    return {
      ...state,
      year,
    };
  },

});

const data = createReducer({
  error: null,
  isLoading: false,
  items: [],
}, {
  [ActionTypes.REQUEST_DATA]: (state) => ({
    ...state,
    error: null,
    isLoading: true,
    items: [],
  }),
  [ActionTypes.RECEIVE_DATA]: (state, { payload }) => {
    const { items } = payload;

    return {
      ...state,
      error: null,
      isLoading: false,
      items,
    };
  },
  [ActionTypes.REQUEST_ERROR]: (state, { payload }) => {
    const { error } = payload;

    return {
      ...state,
      error,
      items: [],
    };
  },
});

const createRootReducer = () => combineReducers({
  filter,
  data,
});

export default createRootReducer;
