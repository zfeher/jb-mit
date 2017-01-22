<template>
  <div :id="`${id}-container`">
    <input
      :id="id"
      @change="handleChange($event)"
      type="date"
      :value="selected"
      :min="min"
      :max="max"
    />
  </div>
</template>

<script>
export default {
  name: 'DatePicker',

  props: {
    id: {
      type: String,
      required: true,
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
