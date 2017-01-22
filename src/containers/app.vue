<template>
  <div id="app">
    <SearchPanel id="search-panel" />
    <SearchResultPanel id="search-result-panel" />
  </div>
</template>

<script>
import SearchPanel from './search-panel.vue';
import SearchResultPanel from './search-result-panel.vue';

export default {
  name: 'App',

  components: {
    SearchPanel,
    SearchResultPanel,
  },

  computed: {
  },

  methods: {
  },
};
</script>

<style>
</style>
