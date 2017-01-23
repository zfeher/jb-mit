<template>
  <div id="app">
    <SearchPanel
      id="search-panel"
      :initOrigin="origin"
      :initDestination="destination"
      :initDepartureDate="departureDate"
      :initReturnDate="returnDate"
      @selectOrigin="handleSelectOrigin($event)"
      @selectDestination="handleSelectDestination($event)"
      @selectDepartureDate="handleSelectDepartureDate($event)"
      @selectReturnDate="handleSelectReturnDate($event)"
      @searchDepartureFlights="handleSearchDepFlights($event)"
      @searchReturnFlights="handleSearchRetFlights($event)"
    />

    </br>

    <SearchResultPanel id="search-result-panel" />
  </div>
</template>

<script>
import SearchPanel from './search-panel.vue';
import SearchResultPanel from './search-result-panel.vue';
import { todayDateStr } from '../common';

let today = todayDateStr();

let getDefaultData = () => ({
  origin: '',
  destination: '',
  departureDate: today,
  returnDate: '',
  departureFlights: [],
  returnFlights: [],
  departureFlight: '',
  returnFlight: '',
});

export default {
  name: 'App',

  components: {
    SearchPanel,
    SearchResultPanel,
  },

  data() {
    return getDefaultData();
  },

  computed: {
  },

  methods: {
    handleSelectOrigin(selected) {
      this.origin = selected;
    },

    handleSelectDestination(selected) {
      this.destination = selected;
    },

    handleSelectDepartureDate(selected) {
      this.departureDate = selected;
    },

    handleSelectReturnDate(selected) {
      this.returnDate = selected;
    },

    handleSearchDepFlights(result) {
      this.departureFlights = result;
    },

    handleSearchRetFlights(result) {
      this.returnFlights = result;
    },
  },
};
</script>

<style>
</style>
