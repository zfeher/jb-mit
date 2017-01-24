<template>
  <div :id="id" :style="{ boxSizing: 'border-box', padding: '10px', border: '1px solid #999' }" >
  </div>
</template>

<script>
export default {
  name: 'SearchResultPanel',

  components: {
  },

  props: {
    id: {
      type: String,
      required: true,
    },
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
