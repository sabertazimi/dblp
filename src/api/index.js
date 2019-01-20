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

export const VenuesDB = [
  {
    venue: 'ASPLOS',
  },
  {
    venue: 'HPCA',
  },
  {
    venue: 'ISCA',
  },
  {
    venue: 'MICRO',
  },
  {
    venue: 'USENIX Annual Technical Conference',
    title: 'ATC',
  },
  {
    venue: 'SC',
  },
  {
    venue: 'PPOPP',
  },
  {
    venue: 'OSDI',
  },
  {
    venue: 'SOSP',
  },
  {
    venue: 'PVLDB',
  },
  {
    venue: 'SIGMOD Conference',
    title: 'SIGMOD',
  },
  {
    venue: 'IEEE Trans. Parallel Distrib. Syst.',
    title: 'TPDS',
  },
  {
    venue: 'ACM Trans. Comput. Syst.',
    title: 'TOCS',
  },
  {
    venue: 'TOS',
  },
  {
    venue: 'FPGA',
  },
  {
    venue: 'EuroSys',
  },
  {
    venue: 'ICS',
  },
  {
    venue: 'PACT',
  },
  {
    venue: 'IPDPS',
  },
  {
    venue: 'DATE',
  },
  {
    venue: 'CGO',
  },
  {
    venue: 'ICPP',
  },
  {
    venue: 'SoCC',
  },
  {
    venue: 'TACO',
  },
  {
    venue: 'ICDE',
  },
  {
    venue: 'ICSE',
  },
  {
    venue: 'KDD',
  },
  {
    venue: 'SIGIR',
  },
  {
    venue: 'FAST',
  },
  {
    venue: 'NSDI',
  },
  {
    venue: 'SIGCOMM',
  },
  {
    venue: 'MobiCom',
  },
  {
    venue: 'INFOCOM',
  },
  {
    venue: 'AAAI',
  },
  {
    venue: 'CVPR',
  },
  {
    venue: 'ICCV',
  },
  {
    venue: 'ICML',
  },
  {
    venue: 'IJCAI',
  },
  {
    venue: 'NeurIPS',
  },
  {
    venue: 'ACL',
  },
  {
    venue: 'ACM Conference on Computer and Communications Security',
    title: 'CCS',
  },
  {
    venue: 'CRYPTO',
  },
  {
    venue: 'IEEE Symposium on Security and Privacy',
    title: 'S&P',
  },
  {
    venue: 'USENIX Security Symposium',
    title: 'Security',
  },
  {
    venue: 'EUROCRYPT',
  },
  {
    venue: 'ACM Trans. Graph.',
    title: 'SIGGRAPH',
  },
  {
    venue: 'ACM Multimedia',
    title: 'MM',
  },
  {
    venue: 'CHI',
  },
  {
    venue: 'VR',
  },
  {
    venue: 'UbiComp',
  },
  {
    venue: 'PLDI',
  },
  {
    venue: 'POPL',
  },
  {
    venue: 'FOCS',
  },
  {
    venue: 'STOC',
  },
  {
    venue: 'LICS',
  },
  {
    venue: 'CAV',
  },
  {
    venue: 'WWW',
  },
  {
    venue: 'RTSS',
  },
];

const getVenueItem = venueName => (
  VenuesDB.find(({ venue }) => venue === venueName)
);

export const VENUES_LIST = VenuesDB.map(({ venue }) => venue);
export const DEFAULT_VENUES_LIST = VENUES_LIST.slice(0, 30);

export const getVenueTitle = venue => (getVenueItem(venue).title || venue);

export const getFilteredData = (items, { venues, year }) => (
  items.filter(item => (
    venues.includes(item.venue)
    && parseInt(item.year, 10) >= year
  )).map(item => ({
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

  return Object.keys(statisticsData).map(key => ({
    venue: key,
    count: statisticsData[key],
  }));
};
