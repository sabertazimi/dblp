import { fetchDblpPapers, fetchPaperCitations } from '../api'
import * as ActionTypes from '../constants'

function makeActionCreator(type, ...argNames) {
  return (...args) => {
    const action = { type }
    action.payload = {}

    argNames.forEach((argName, index) => {
      action.payload[argNames[index]] = args[index]
    })

    return action
  }
}

export const filterVenue = makeActionCreator(ActionTypes.FILTER_VENUE, 'venues')
export const filterYear = makeActionCreator(ActionTypes.FILTER_YEAR, 'year')

const requestData = makeActionCreator(ActionTypes.REQUEST_DATA, 'query')
const receiveData = makeActionCreator(ActionTypes.RECEIVE_DATA, 'items')
const requestError = makeActionCreator(ActionTypes.REQUEST_ERROR, 'error')

export function fetchData(keyword) {
  return async (dispatch, getState) => {
    const venues = getState().filter.venues

    dispatch(requestData(venues))

    const papers = await fetchDblpPapers(keyword, venues)
    if (!papers)
      dispatch(requestError(new Error('Bad Request')))

    const paperCitations = await fetchPaperCitations(papers)

    const papersDataWithCitations = papers.map((paper, index) => ({
      ...paper,
      citations: paperCitations[index],
    }))

    setTimeout(() => {
      dispatch(receiveData(papersDataWithCitations))
    }, 255)
  }
}
