import venuesData from '../venues.json';
//import 'regenerator-runtime/runtime';

export const dblpQuery = (keyword, venue) =>
  `https://dblp.org/search/publ/api?q=${keyword} venue:${venue}:&format=json&h=999`;

export const SCQueryForID = title =>
  `https://api.semanticscholar.org/graph/v1/paper/search?query=${title}&limit=1`;

export const SCQueryForCitations = paperid =>
  `https://api.semanticscholar.org/graph/v1/paper/${paperid}/citations`;

let KEY = 0;

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

/*const getCitation = async (info) => {
  let citation = 0;
  const headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  // headers.append('Authorization', 'Basic ' + base64.encode(username + ":" +  password));
  headers.append('Origin', 'http://localhost:3000');

  await fetch(SCQueryForID(info.title), {
    method: 'GET',
    mode: 'cors',
    headers,
  })
    //   )
    .then(response => {
      console.log('get response');

      if (response.ok) {
        return response.json();
      }
      console.log(`response is not ok ${response.status}`);
      console.log(response.header);
      console.log(response.body);
      return null;
    })
    .then(data => {
      if (!data) {
        return null;
      } else {
        return data.data[0].paperId;
      }
    })
    .then(paperId => {
      if (!paperId) {
        // eslint-disable-next-line no-console
        console.log('no paperID');
      } else {
        console.log('query about citation');
        sleep(300);
        // eslint-disable-next-line no-console

        //    Promise.all(
        // return (
        fetch(SCQueryForCitations(paperId), {
          method: 'GET',
          mode: 'cors',
          headers,
        })
          //  )
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            return null;
          })
          .then(data => {
            if (!data) {
              // eslint-disable-next-line no-console
              console.log('no citations');
              return 0;
            } else {
              return data.data.length;
            }
          })
          .then(length => {
            // eslint-disable-next-line no-console
            console.log(`the citations is ${length}`);
            citation = length;
          });
        //  );
      }
    });
  return citation;
}*/

export const normalize = data =>
  data
    .map(({ result }) => {
      const { hit } = result.hits;

      if (!hit) {
        return [];
      }


      return hit.map(({ info }) => {

       // const citation = getCitation(info);
        //   Promise.all(
        let citation = 0;
        const headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        // headers.append('Authorization', 'Basic ' + base64.encode(username + ":" +  password));
        headers.append('Origin', 'http://localhost:3000');

        fetch(SCQueryForID(info.title), {
          method: 'GET',
          mode: 'cors',
          headers,
        })
          //   )
          .then(response => {
            console.log('get response');

            if (response.ok) {
              return response.json();
            }
            console.log(`response is not ok ${response.status}`);
            console.log(response.header);
            console.log(response.body);
            return null;
          })
          .then(data => {
            if (!data) {
              return null;
            } else {
              return data.data[0].paperId;
            }
          })
          .then(paperId => {
            if (!paperId) {
              // eslint-disable-next-line no-console
              console.log('no paperID');
            } else {
              console.log('query about citation');
              sleep(300);
              // eslint-disable-next-line no-console

              //    Promise.all(
              // return (
              fetch(SCQueryForCitations(paperId), {
                method: 'GET',
                mode: 'cors',
                headers,
              })
                //  )
                .then(response => {
                  if (response.ok) {
                    return response.json();
                  }
                  return null;
                })
                .then(data => {
                  if (!data) {
                    // eslint-disable-next-line no-console
                    console.log('no citations');
                    return 0;
                  } else {
                    return data.data.length;
                  }
                })
                .then(length => {
                  // eslint-disable-next-line no-console
                  console.log(`the citations is ${length}`);
                  citation = length;
                });
              //  );
            }
          });

        console.log(`the citation is ${citation}`);
        return {
          key: KEY++,
          title: info.title,
          venue: info.venue,
          year: info.year,
          url: info.ee,
          citations: citation,
        };
        /*  {
            key: KEY++,
            title: info.title,
            venue: info.venue,
            year: info.year,
            url: info.ee,
            citations: 1,
          } */
      });
    })
    .flat();

export const VenuesDB = venuesData;

const getVenueItem = venueName =>
  VenuesDB.find(({ venue }) => venue === venueName);

export const VENUES_LIST = VenuesDB.map(({ venue }) => venue);
export const DEFAULT_VENUES_LIST = VENUES_LIST.slice(0, 30);

export const getVenueTitle = venue => getVenueItem(venue).title || venue;

export const getFilteredData = (items, { venues, year }) => {
  console.log(items);
  return items
    .filter(
      item => venues.includes(item.venue) && parseInt(item.year, 10) >= year
    )
    .map(item => ({
      ...item,
      venue: getVenueTitle(item.venue),
    }));
};

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
