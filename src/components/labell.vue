<template>
  <span :id="id">{{text}}</span>
</template>

<script>
export default {
  name: 'Labell',

  props: {
    id: String,

    text: {
      type: String,
      required: true,
    }
  },
};
</script>

<style>
</style>
