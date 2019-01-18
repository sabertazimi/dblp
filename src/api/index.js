export const dblpQuery = (keyword, venue) => (
  `https://dblp.org/search/publ/api?q=${keyword} venue:${venue}:&format=json&h=999`
);

let KEY = 0;

export const normalize = data => (
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

export const VENUES_LIST = [
  'ASPLOS',
  'HPCA',
  'ISCA',
  'MICRO',
];
