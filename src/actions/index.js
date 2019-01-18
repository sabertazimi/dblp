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

export const filter = makeActionCreator(ActionTypes.FILTER_VENUE, 'venues');

const requestData = makeActionCreator(ActionTypes.REQUEST_DATA, 'query');
const receiveData = makeActionCreator(ActionTypes.RECEIVE_DATA, 'data');
const requestError = makeActionCreator(ActionTypes.REQUEST_ERROR, 'error');

export const fetchData = (keyword, venues) => (dispatch) => {
  dispatch(requestData(venues));

  return Promise.all(venues.map(venue => fetch(dblpQuery(keyword, venue), {
    method: 'GET',
    mode: 'cors',
  })))
    .then(responses => (
      Promise.all(
        responses.map((response) => {
          if (response.ok) {
            return response.json();
          }

          return null;
        }),
      )
    ))
    .then((data) => {
      if (!data) {
        dispatch(requestError(new Error('Bad Request')));
      }

      setTimeout(() => {
        dispatch(receiveData(normalize(data)));
      }, 255);
    });
};
