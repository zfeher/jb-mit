import Vue from 'vue';
import Vuex from 'vuex';
import * as R from 'ramda';

Vue.use(Vuex);

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
  },

  actions: {
  },
});
