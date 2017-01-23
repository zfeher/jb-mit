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

    <SearchResultPanel
      id="search-result-panel"
      v-if="showResultPanel"
      :origin="origin"
      :destination="destination"
      :departureDate="departureDate"
      :initReturnDate="returnDate"
      :departureFlights="departureFlights"
      :initReturnFlights="returnFlights"
      @selectReturnDate="handleSelectReturnDate($event)"
      @searchReturnFlights="handleSearchRetFlights($event)"
      @resetClick="handleResetClick"
    />
  </div>
</template>

<script>
import * as R from 'ramda';
import SearchPanel from './search-panel.vue';
import SearchResultPanel from './search-result-panel.vue';
import { todayDateStr, isNotEmpty } from '../common';

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
    showResultPanel() {
      return R.any(isNotEmpty, [this.departureFlights, this.returnFlights]);
    },
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

    handleResetClick() {
      // TODO
      console.log('reset data ...')
    }
  },
};
</script>

<style>
</style>
