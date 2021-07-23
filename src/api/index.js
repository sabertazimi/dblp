import venuesData from '../venues.json';

export const dblpQuery = (keyword, venue) => (
  `https://dblp.org/search/publ/api?q=${keyword} venue:${venue}:&format=json&h=999`
);

let KEY = 0;

export const normalize = (data) => (
  data.map(({ result }) => {
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
  }).flat()
);

export const VenuesDB = venuesData;

const getVenueItem = (venueName) => (
  VenuesDB.find(({ venue }) => venue === venueName)
);

export const VENUES_LIST = VenuesDB.map(({ venue }) => venue);
export const DEFAULT_VENUES_LIST = VENUES_LIST.slice(0, 30);

export const getVenueTitle = (venue) => (getVenueItem(venue).title || venue);

export const getFilteredData = (items, { venues, year }) => (
  items.filter((item) => (
    venues.includes(item.venue)
    && parseInt(item.year, 10) >= year
  )).map((item) => ({
    ...item,
    venue: getVenueTitle(item.venue),
  }))
);

export const getStatisticsData = (items, { venues, year }) => {
  const filteredItems = getFilteredData(items, { venues, year });
  const statisticsData = {};

  filteredItems.forEach(({ venue }) => {
    if (!statisticsData[venue]) {
      statisticsData[venue] = 0;
    }

    statisticsData[venue] += 1;
  });

  return Object.keys(statisticsData).map((key) => ({
    venue: key,
    count: statisticsData[key],
  }));
};
