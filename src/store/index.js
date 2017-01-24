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
  },

  getters: {
  },

  mutations: {
    selectOrigin(state, selected) {
      state.origin = {
        value: selected,
        error: '',
      };
    },
  },

  actions: {
  },
});
