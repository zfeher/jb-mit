<template>
  <input
    :id="id"
    @change="handleChange($event)"
    type="date"
    :value="selected"
    :min="min"
    :max="max"
    :style="{ width }"
  />
</template>

<script>
export default {
  name: 'DatePicker',

  props: {
    id: {
      type: String,
      required: true,
    },

    width: {
      type: String,
      default: '123px',
    },

    selected: String,
    min: String,
    max: String,
  },

  methods: {
    handleChange(event) {
      let selected = event.target.value;
      this.$emit('select', selected);
    }
  },
};
</script>

<style>
</style>
