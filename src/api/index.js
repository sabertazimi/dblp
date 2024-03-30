import venuesData from '../venues.json'

export const VenuesDB = venuesData
export const VENUES_LIST = VenuesDB.map(({ venue }) => venue)
export const DEFAULT_VENUES_LIST = VENUES_LIST.slice(0, 30)

function dblpQuery(keyword, venue) {
  return `https://dblp.org/search/publ/api?q=${keyword} venue:${venue}:&format=json&h=999`
}
function scIdsQuery(title) {
  return `https://api.semanticscholar.org/graph/v1/paper/search?query=${title}&limit=1`
}
function scCitationsQuery(paperId) {
  return `https://api.semanticscholar.org/graph/v1/paper/${paperId}?fields=citationCount`
}

export async function fetchDblpPapers(keyword, venues) {
  const papersResponse = await Promise.all(
    venues.map(venue =>
      fetch(dblpQuery(keyword, venue), {
        method: 'GET',
        mode: 'cors',
      }),
    ),
  )

  const papersJson = await Promise.all(
    papersResponse.map(response => (response.ok ? response.json() : null)),
  )

  const papers = papersJson
    ? papersJson
      .map(({ result }) => {
        const { hit } = result?.hits

        if (!hit)
          return []

        return hit.map(({ info }) => ({
          key: info.key,
          title: info.title,
          venue: info.venue.replaceAll('.', ''),
          year: info.year,
          url: info.ee,
        }))
      })
      .flat()
    : null

  return papers
}

export async function fetchPaperCitations(papers) {
  let paperCitations = Array(papers.length).fill(0)

  try {
    const paperIdsResponse = await Promise.all(
      papers.map(paper =>
        fetch(scIdsQuery(paper.title), {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }),
      ),
    )

    const paperIdsJson = await Promise.all(
      paperIdsResponse.map(response => (response.ok ? response.json() : {})),
    )

    if (!paperIdsJson)
      return paperCitations

    const paperIds = paperIdsJson.map(paper =>
      paper && paper.data[0] ? paper.data[0].paperId : '0',
    )

    const paperCitationsResponse = await Promise.all(
      paperIds.map(paperId =>
        fetch(scCitationsQuery(paperId), {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }),
      ),
    )

    const paperCitationsJson = await Promise.all(
      paperCitationsResponse.map(response =>
        response.ok ? response.json() : {},
      ),
    )

    if (!paperCitationsJson)
      return paperCitations

    paperCitations = paperCitationsJson.map(paperCitation =>
      paperCitation && paperCitation.citationCount
        ? paperCitation.citationCount
        : 0,
    )
  } catch (error) {
    console.error('Up to API limits.')
  }

  return paperCitations
}

function getVenueItem(venueName) {
  return VenuesDB.find(({ venue }) => venue === venueName)
}

export const getVenueTitle = venue => getVenueItem(venue).title || venue

export function getFilteredData(items, { venues, year }) {
  return items
    .filter(
      item => venues.includes(item.venue) && Number.parseInt(item.year, 10) >= year,
    )
    .map(item => ({
      ...item,
      venue: getVenueTitle(item.venue),
    }))
}

export function getStatisticsData(items, { venues, year }) {
  const filteredItems = getFilteredData(items, { venues, year })
  const statisticsData = {}

  filteredItems.forEach(({ venue }) => {
    if (!statisticsData[venue])
      statisticsData[venue] = 0

    statisticsData[venue] += 1
  })

  return Object.keys(statisticsData).map(key => ({
    venue: key,
    count: statisticsData[key],
  }))
}
