import * as ActionTypes from '../constants';
import { dblpQuery, normalize } from '../api';

const makeActionCreator = (type, ...argNames) => (...args) => {
  const action = { type };
  action.payload = {};

  argNames.forEach((argName, index) => {
    action.payload[argNames[index]] = args[index];
  });

  return action;
};

export const filter = makeActionCreator(ActionTypes.FILTER, 'venues');

const requestData = makeActionCreator(ActionTypes.REQUEST_DATA, 'query');
const receiveData = makeActionCreator(ActionTypes.RECEIVE_DATA, 'data');
const requestError = makeActionCreator(ActionTypes.REQUEST_ERROR, 'error');

export const fetchData = (keyword, venue) => (dispatch) => {
  const query = dblpQuery(keyword, venue);
  dispatch(requestData(query));

  return fetch(query)
    .then((res) => {
      if (!res.ok) {
        dispatch(requestError(new Error('Bad Request')));
        return null;
      }

      return res.json();
    })
    .then((data) => {
      if (!data) {
        dispatch(requestError(new Error('Bad Request')));
      }

      setTimeout(() => {
        dispatch(receiveData(normalize(data)));
      }, 255);
    });
};
