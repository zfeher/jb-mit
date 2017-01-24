import Vue from 'vue';
import { App } from './containers';
import { createStore } from './store';

let store = createStore();

new Vue({
  el: '#app',
  store,
  render: h => h(App),
});
