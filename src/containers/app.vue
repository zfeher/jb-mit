<template>
  <div id="app">
    <SearchPanel
      id="search-panel"
      @selectOrigin="selectOrigin($event)"
      @selectDestination="selectDestination($event)"
      @selectDepartureDate="selectDepartureDate($event)"
      @selectReturnDate="selectReturnDate($event)"
      @searchFlights="searchFlights"
      :origin="origin"
      :destination="destination"
      :departureDate="departureDate"
      :returnDate="returnDate"
    />

    </br>

    <SearchResultPanel
      id="search-result-panel"
      @selectDepartureFlight="selectDepartureFlight"
      @selectReturnDate="selectReturnDate($event)"
      @selectReturnFlight="selectReturnFlight"
      @startOverClick="startOverClick"
      :origin="origin.value"
      :destination="destination.value"
      :departureDate="departureDate.value"
      :departureFlights="departureFlights"
      :departureFlight="departureFlight"
      :returnDate="returnDate"
      :returnFlights="returnFlights"
      :returnFlight="returnFlight"
    />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import SearchPanel from './search-panel.vue';
import SearchResultPanel from './search-result-panel.vue';

export default {
  name: 'App',

  components: {
    SearchPanel,
    SearchResultPanel,
  },

  data() {
    return {
    };
  },

  computed: mapState([
    'origin',
    'destination',
    'departureDate',
    'returnDate',
    'departureFlights',
    'returnFlights',
    'departureFlight',
    'returnFlight',
  ]),

  methods: {
    ...mapMutations([
      'selectOrigin',
      'selectDestination',
      'selectDepartureDate',
      'selectReturnDate',
      'selectDepartureFlight',
      'selectReturnFlight',
      'startOverClick',
    ]),
    ...mapActions(['searchFlights']),
  },
};
</script>

<style>
</style>
