<template>
  <div id="app">
    <SearchPanel
      id="search-panel"
    />

    </br>

    <SearchResultPanel
      id="search-result-panel"
    />
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

  data() {
    return {
    };
  },

  computed: {
  },

  methods: {
  },
};
</script>

<style>
</style>
