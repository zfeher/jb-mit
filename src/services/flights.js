import 'whatwg-fetch';

const SEARCH_URL = 'http://78.24.185.27:8570/search';

export let searchFlights = (origin, destination, date) => {
  const url = encodeURI(
    `${SEARCH_URL}?departureStation=${origin}&arrivalStation=${destination}&date=${date}`
  );

  return fetch(url)
    .then(response => response.json());
};
