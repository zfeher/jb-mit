import Vue from 'vue';
import Vuex from 'vuex';
import * as R from 'ramda';
import { todayDateStr } from '../common';
import { MAX_FLIGHT_DATE } from '../config';

Vue.use(Vuex);

let today = todayDateStr();
let alwaysEmptyStr = R.always('');

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
      value: today,
      min: today,
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

      // TODO duplicate selectDestination(state, '')
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
    },
  },

  actions: {
  },
});
