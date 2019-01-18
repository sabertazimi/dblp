export const dblpQuery = (keyword, venue) => (
  `http://dblp.org/search/publ/api?q=${keyword} venue:${venue}:&format=json&h=999`
);

let KEY = 0;

export const normalize = (data) => {
  const { hit: results } = data.result.hits;

  if (!results) {
    return [];
  }

  return results.map(({ info }) => ({
    key: KEY++,
    title: info.title,
    venue: info.venue,
    year: info.year,
    url: info.ee,
  }));
};

export const VENUES_LIST = [
  'ASPLOS',
  'HPCA',
  'ISCA',
  'MICRO',
];
