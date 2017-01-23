import 'whatwg-fetch';

const STATIONS_URL = 'http://78.24.185.27:8570/asset/stations';

export let getCitiesWithConnections = () => {
  return fetch(STATIONS_URL)
    .then(response => response.json());
};
