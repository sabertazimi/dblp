import { combineReducers } from 'redux';
import * as ActionTypes from '../constants';

const createReducer = (initialState, handlers) => (state = initialState, action) => {
  if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
    return handlers[action.type](state, action);
  }

  return state;
};

const selectReducer = createReducer({ selection: [] }, {
  [ActionTypes.SELECT]: (state, action) => {
    const { selection } = state;
    const { venue } = action.payload;

    return {
      ...state,
      selection: [...new Set(selection.push(venue))], // remove duplicate venue with Set
    };
  },
  [ActionTypes.DESLECT]: (state, action) => {
    const { selection } = state;
    const { venue } = action.payload;

    return {
      ...state,
      selection: selection.filter(select => select !== venue),
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
  selectReducer,
  dataReducer,
});

export default createRootReducer;
