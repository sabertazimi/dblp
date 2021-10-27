import venuesData from '../venues.json';

export const dblpQuery = (keyword, venue) =>
  `https://dblp.org/search/publ/api?q=${keyword} venue:${venue}:&format=json&h=999`;

export const scQueryForID = title =>
  `https://api.semanticscholar.org/graph/v1/paper/search?query=${title}&limit=1`;

export const scQueryForCitations = paperid =>
  `https://api.semanticscholar.org/graph/v1/paper/${paperid}/citations`;

export const VenuesDB = venuesData;

const getVenueItem = venueName =>
  VenuesDB.find(({ venue }) => venue === venueName);

export const VENUES_LIST = VenuesDB.map(({ venue }) => venue);
export const DEFAULT_VENUES_LIST = VENUES_LIST.slice(0, 30);

export const getVenueTitle = venue => getVenueItem(venue).title || venue;

export const getFilteredData = (items, { venues, year }) =>
  items
    .filter(
      item => venues.includes(item.venue) && parseInt(item.year, 10) >= year
    )
    .map(item => ({
      ...item,
      venue: getVenueTitle(item.venue),
    }));

export const getStatisticsData = (items, { venues, year }) => {
  const filteredItems = getFilteredData(items, { venues, year });
  const statisticsData = {};

  filteredItems.forEach(({ venue }) => {
    if (!statisticsData[venue]) {
      statisticsData[venue] = 0;
    }

    statisticsData[venue] += 1;
  });

  return Object.keys(statisticsData).map(key => ({
    venue: key,
    count: statisticsData[key],
  }));
};
