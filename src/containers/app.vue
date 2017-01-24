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
    'returnFlights'
  ]),

  methods: {
    ...mapMutations([
      'selectOrigin',
      'selectDestination',
      'selectDepartureDate',
      'selectReturnDate'
    ]),
    ...mapActions(['searchFlights']),
  },
};
</script>

<style>
</style>
