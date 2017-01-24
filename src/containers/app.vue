<template>
  <div id="app">
    <SearchPanel
      id="search-panel"
      @selectOrigin="selectOrigin($event)"
      @selectDestination="selectDestination($event)"
      :origin="origin"
      :destination="destination"
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

  computed: mapState(['origin', 'destination']),

  methods: mapMutations(['selectOrigin', 'selectDestination']),
};
</script>

<style>
</style>
