import * as ActionTypes from '../constants';
import { dblpQuery, scQueryForCitations, scQueryForID } from '../api';

const makeActionCreator =
  (type, ...argNames) =>
  (...args) => {
    const action = { type };
    action.payload = {};

    argNames.forEach((argName, index) => {
      action.payload[argNames[index]] = args[index];
    });

    return action;
  };

export const filterVenue = makeActionCreator(
  ActionTypes.FILTER_VENUE,
  'venues'
);
export const filterYear = makeActionCreator(ActionTypes.FILTER_YEAR, 'year');

const requestData = makeActionCreator(ActionTypes.REQUEST_DATA, 'query');
const receiveData = makeActionCreator(ActionTypes.RECEIVE_DATA, 'items');
const requestError = makeActionCreator(ActionTypes.REQUEST_ERROR, 'error');

let KEY = 0;

export const fetchData = (keyword, venues) => async dispatch => {
  dispatch(requestData(venues));

  const paperResponse = await Promise.all(
    venues.map(venue =>
      fetch(dblpQuery(keyword, venue), {
        method: 'GET',
        mode: 'cors',
      })
    )
  );

  const paperJson = await Promise.all(
    paperResponse.map(response => (response.ok ? response.json() : null))
  );

  if (!paperJson) {
    dispatch(requestError(new Error('Bad Request')));
  }

  const paperData = paperJson
    .map(({ result }) => {
      const { hit } = result.hits;

      if (!hit) {
        return [];
      }

      return hit.map(({ info }) => ({
        key: KEY++,
        title: info.title,
        venue: info.venue,
        year: info.year,
        url: info.ee,
      }));
    })
    .flat();

  let scPaperCitationData = Array(paperData.length).fill(0);

  try {
    const scPaperIdResponse = await Promise.all(
      paperData.map(paper =>
        fetch(scQueryForID(paper.title), {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        })
      )
    );

    const scPaperIdJson = await Promise.all(
      scPaperIdResponse.map(response => (response.ok ? response.json() : {}))
    );

    if (!scPaperIdJson) {
      dispatch(requestError(new Error('Bad Request')));
    }

    const scPaperIdData = scPaperIdJson.map(paper =>
      paper && paper.data[0] ? paper.data[0].paperId : '0'
    );

    const scPaperCitationResponse = await Promise.all(
      scPaperIdData.map(paperId =>
        fetch(scQueryForCitations(paperId), {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        })
      )
    );

    const scPaperCitationJson = await Promise.all(
      scPaperCitationResponse.map(response =>
        response.ok ? response.json() : {}
      )
    );

    if (!scPaperCitationJson) {
      dispatch(requestError(new Error('Bad Request')));
    }

    scPaperCitationData = scPaperCitationJson.map(paperCitation =>
      paperCitation && paperCitation.data ? paperCitation.data.length : 0
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Up to API limits.');
  }

  const paperDataWithCitations = paperData.map((paper, index) => ({
    ...paper,
    citations: scPaperCitationData[index],
  }));

  setTimeout(() => {
    dispatch(receiveData(paperDataWithCitations));
  }, 255);
};
