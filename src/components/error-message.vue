<template>
  <p :style="{ boxSizing: 'border-box', margin: 0, padding: 0, display: 'inline-block', color: 'orange' }" >
    {{ message }}
  </p>
</template>

<script>
export default {
  name: 'ErrorMessage',
  props: {
    message: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
</style>
