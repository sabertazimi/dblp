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
  'USENIX Annual Technical Conference',
  'SC',
  'PPOPP',
  'OSDI',
  'SOSP',
  'PVLDB',
  'SIGMOD Conference',
  'IEEE Trans. Parallel Distrib. Syst.',
  'ACM Trans. Comput. Syst.',
  'TOS',
  'FPGA',
  'EuroSys',
  'ICS',
  'PACT',
  'IPDPS',
  'DATE',
  'CGO',
  'ICPP',
  'SoCC',
  'TACO',
  'ICDE',
  'ICSE',
  'KDD',
  'SIGIR',
  'FAST',
  'NSDI',
  'SIGCOMM',
  'MobiCom',
  'INFOCOM',
  'AAAI',
  'CVPR',
  'ICCV',
  'ICML',
  'IJCAI',
  'NeurIPS',
  'ACL',
  'ACM Conference on Computer and Communications Security',
  'CRYPTO',
  'IEEE Symposium on Security and Privacy',
  'USENIX Security Symposium',
  'EUROCRYPT',
  'ACM Trans. Graph.',
  'ACM Multimedia',
  'CHI',
  'VR',
  'UbiComp',
  'PLDI',
  'POPL',
  'FOCS',
  'STOC',
  'LICS',
  'CAV',
  'WWW',
  'RTSS',
];

const VENUES_TITLE = {
  'USENIX Annual Technical Conference': 'ATC',
  'SIGMOD Conference': 'SIGMOD',
  'IEEE Trans. Parallel Distrib. Syst.': 'TPDS',
  'ACM Trans. Comput. Syst.': 'TOCS',
  'ACM Conference on Computer and Communications Security': 'CCS',
  'IEEE Symposium on Security and Privacy': 'S&P',
  'USENIX Security Symposium': 'Security',
  'ACM Trans. Graph.': 'SIGGRAPH',
  'ACM Multimedia': 'MM',
};

export const venueTitle = venue => (VENUES_TITLE[venue] || venue);
