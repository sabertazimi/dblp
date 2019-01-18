import { combineReducers } from 'redux';
import * as ActionTypes from '../constants';
import { VENUES_LIST } from '../api';

const createReducer = (initialState, handlers) => (state = initialState, action) => {
  if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
    return handlers[action.type](state, action);
  }

  return state;
};

const filterReducer = createReducer({ venues: VENUES_LIST }, {
  [ActionTypes.FILTER]: (state, action) => {
    const { venues } = action.payload;

    return {
      ...state,
      venues,
    };
  },
});

const dataReducer = createReducer({ error: null, isLoading: false, data: [] }, {
  [ActionTypes.REQUEST_DATA]: state => ({
    ...state,
    error: null,
    isLoading: true,
    data: [],
  }),
  [ActionTypes.RECEIVE_DATA]: (state, action) => {
    const { data } = action.payload;

    return {
      ...state,
      error: null,
      isLoading: false,
      data,
    };
  },
  [ActionTypes.REQUEST_ERROR]: (state, action) => {
    const { error } = action.payload;

    return {
      ...state,
      error,
      data: [],
    };
  },
});

const createRootReducer = () => combineReducers({
  filterReducer,
  dataReducer,
});

export default createRootReducer;
