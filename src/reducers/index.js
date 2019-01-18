
import { combineReducers } from 'redux';
import * as ActionTypes from '../constants';
import { VENUES_LIST } from '../api';

const createReducer = (initialState, handlers) => (state = initialState, action) => {
  if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
    return handlers[action.type](state, action);
  }

  return state;
};

const filter = createReducer({
  venues: VENUES_LIST,
  year: 0,
}, {
  [ActionTypes.FILTER_VENUE]: (state, action) => {
    const { venues } = action.payload;

    return {
      ...state,
      venues,
    };
  },
  [ActionTypes.FILTER_YEAR]: (state, action) => {
    const { year } = action.payload;

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
  [ActionTypes.REQUEST_DATA]: state => ({
    ...state,
    error: null,
    isLoading: true,
    items: [],
  }),
  [ActionTypes.RECEIVE_DATA]: (state, action) => {
    const { items } = action.payload;

    return {
      ...state,
      error: null,
      isLoading: false,
      items,
    };
  },
  [ActionTypes.REQUEST_ERROR]: (state, action) => {
    const { error } = action.payload;

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
