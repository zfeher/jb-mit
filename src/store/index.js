import Vue from 'vue';
import Vuex from 'vuex';
import * as R from 'ramda';
import { dateStrGt, todayDateStr } from '../common';
import { MAX_FLIGHT_DATE } from '../config';

Vue.use(Vuex);

let alwaysEmptyStr = R.always('');

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
  },

  getters: {
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
  },

  actions: {
  },
});
