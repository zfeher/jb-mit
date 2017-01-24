<template>
  <div id="app">
    <SearchPanel
      id="search-panel"
      @selectOrigin="selectOrigin($event)"
      @selectDestination="selectDestination($event)"
      @selectDepartureDate="selectDepartureDate($event)"
      :origin="origin"
      :destination="destination"
      :departureDate="departureDate"
    />

    </br>

    <SearchResultPanel
      id="search-result-panel"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
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

  computed: mapState(['origin', 'destination', 'departureDate']),

  methods: mapMutations(['selectOrigin', 'selectDestination', 'selectDepartureDate']),
};
</script>

<style>
</style>
