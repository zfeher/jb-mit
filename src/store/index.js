import Vue from 'vue';
import Vuex from 'vuex';
import * as R from 'ramda';
import { dateStrGt, todayDateStr } from '../common';
import { MAX_FLIGHT_DATE } from '../config';
import { validate, checkNotEmpty, checkDateStrGte } from '../validator';
import { searchFlights } from '../services';

Vue.use(Vuex);

let __ = R.__;
let alwaysEmptyStr = R.always('');

let validateOrigin = validate([checkNotEmpty('origin')]);
let validateDestination = validate([checkNotEmpty('destination')]);

let validateDepartureDate = (today, value) =>
  validate(
    [
      checkNotEmpty('departure date'),
      checkDateStrGte('departure date', 'today', __, today)
    ],
    value,
  );

let validateReturnDate = (departureDate, today, value) =>
  validate(
    [
      checkNotEmpty('return date'),
      checkDateStrGte('return date', 'departure date', __, departureDate),
      checkDateStrGte('return date', 'today', __, today)
    ],
    value,
);

let today = todayDateStr();
let defaultDepDate = today;

export let createStore = () => new Vuex.Store({
  state: {
    origin: {
      value: '',
      error: '',
    },

    destination: {
      value: '',
      error: '',
    },

    departureDate: {
      value: defaultDepDate,
      min: today,
      max: MAX_FLIGHT_DATE,
      error: '',
    },

    returnDate: {
      value: '',
      min: defaultDepDate,
      max: MAX_FLIGHT_DATE,
      error: '',
    },

    departureFlights: [],
    returnFlights: [],
    departureFlight: '',
  },

  getters: {
    valid(state) {
      let { origin, destination, departureDate, returnDate } = state;
      let fields = [origin, destination, departureDate, returnDate];

      return R.compose(
        R.all(R.isEmpty),
        R.pluck('error')
      )(fields);
    },
  },

  mutations: {
    selectOrigin(state, selected) {
      state.origin = {
        value: selected,
        error: '',
      };

      // TODO duplicate selectDestination(state, '') ?
      // TODO add a selectOrigin action which commits multiple mutations way ?
      //  - commit selectOrigin
      //  - commit selectDestination
      state.destination = {
        value: '',
        error: '',
      };
    },

    selectDestination(state, selected) {
      state.destination = {
        value: selected,
        error: '',
      };
    },

    selectDepartureDate(state, selected) {
      state.departureDate = {
        ...state.departureDate,
        value: selected,
        error: ''
      };

      // TODO extract
      // TODO could be a computed/getter thing because depends on departure date
      //  - but also has his own state hmmm
      // TODO essentially the object form of returnDate is the problem
      //  - as separate attribs (returnDate, returnDateMin, returnDateMax, returnDateError)
      //    some of them could be normal state some of them computed/getter
      // TODO or apply some FRP magic ?
      let depDate = state.departureDate.value;
      let { value: retDate, error: retDateError } = state.returnDate;
      let retDateMin = depDate ? depDate : today;

      if (retDate && dateStrGt(depDate, retDate)) {
        retDate = '';
        retDateError = '';
      }

      state.returnDate = {
        ...state.returnDate,
        value: retDate,
        min: retDateMin,
        error: retDateError,
      };
    },

    selectReturnDate(state, selected) {
      state.returnDate = {
        ...state.returnDate,
        value: selected,
        error: ''
      };
    },

    validateOrigin(state) {
      let { origin } = state;

      state.origin = {
        ...origin,
        error: validateOrigin(origin.value)
      };
    },

    validateDestination(state) {
      let { destination } = state;

      state.destination = {
        ...destination,
        error: validateDestination(destination.value)
      };
    },

    validateDepartureDate(state) {
      let { departureDate } = state;

      state.departureDate = {
        ...departureDate,
        error: validateDepartureDate(today, departureDate.value)
      };
    },

    validateReturnDate(state) {
      let { returnDate, departureDate } = state;
      let retDateVal = returnDate.value;
      let retDateError = '';

      if (retDateVal) {
        retDateError = validateReturnDate(departureDate.value, today, retDateVal);
      }

      state.returnDate = {
        ...returnDate,
        error: retDateError,
      };
    },

    searchDepartureFlights(state, flights) {
      state.departureFlights = flights;
    },

    searchReturnFlights(state, flights) {
      state.returnFlights = flights;
    },

    selectDepartureFlight(state, selected) {
      state.departureFlight = selected;
    },

  },

  actions: {
    searchFlights(context) {
      let { commit, dispatch, state, getters } = context;

      // TODO async/await
      dispatch('validate').then(() => {
        if (getters.valid) {
          let { origin, destination, departureDate, returnDate } = state;
          let origVal = origin.value;
          let destVal = destination.value;
          let retDateVal = returnDate.value;

          // TODO async/await
          searchFlights(origVal, destVal, departureDate.value).then(result => {
            commit('searchDepartureFlights', result);
          });

          if (retDateVal) {
            // TODO async/await
            searchFlights(destVal, origVal, retDateVal).then(result => {
              commit('searchReturnFlights', result);
            });
          }
        }
      });
    },

    validate(context) {
      let { commit } = context;

      R.forEach(
        commit,
        [
          'validateOrigin',
          'validateDestination',
          'validateDepartureDate',
          'validateReturnDate'
        ],
      );
    },
  },
});
