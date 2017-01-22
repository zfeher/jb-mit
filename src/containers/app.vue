<template>
  <div id="app">
    <SearchPanel id="search-panel" />

    <Labell text="Departure Flights" />
    <ListBox
      id="departureFlight"
      @select="handleDepFlightSelect($event)"
      :options="depFlightOptions"
      :selectedValue="departureFlight"
    />

    <Labell text="Return Flights" />
    <ListBox
      id="returnFlight"
      @select="handleRetFlightSelect($event)"
      :options="retFlightOptions"
      :selectedValue="returnFlight"
    />

  </div>
</template>

<script>
import { Labell, ListBox } from '../components';
import SearchPanel from './search-panel.vue';

export default {
  name: 'App',

  components: {
    Labell,
    ListBox,
    SearchPanel,
  },

  data() {
    return {
      departureFlight: '',
      returnFlight: '',
    };
  },

  computed: {
    depFlightOptions() {
      return [{
        text: 'dep1',
        value: 'dep1',
      }, {
        text: 'dep2',
        value: 'dep2',
      }];
    },

    retFlightOptions() {
      return [{
        text: 'ret1',
        value: 'ret1',
      }, {
        text: 'ret2',
        value: 'ret2',
      }];
    },
  },

  methods: {
    handleDepFlightSelect(selected) {
      this.departureFlight = selected;
    },

    handleRetFlightSelect(selected) {
      this.returnFlight = selected;
    },
  },
};
</script>

<style>
</style>
