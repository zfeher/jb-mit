<template>
  <span :id="id" >
    <p :style="{ boxSizing: 'border-box', margin: 0, padding: 0, display: 'inline-block', width }" >
      {{text}}
    </p>
  </span>
</template>

<script>
export default {
  name: 'Labell',

  props: {
    id: String,

    width: {
      type: String,
      default: '200px',
    },

    text: {
      type: String,
      required: true,
    }
  },
};
</script>

<style>
</style>

