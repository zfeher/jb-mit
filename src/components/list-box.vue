<template>
  <select
      :id="id"
      @change="handleChange($event)"
      :size="size"
      :style="{ width } ">
    <option
        v-for="option in options"
        :value="option.value"
        :selected="isSelected(option.value)" >
      {{ option.text }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'ListBox',

  props: {
    id: {
      type: String,
      required: true,
    },

    width: {
      type: String,
      default: '200px',
    },

    size: {
      type: Number,
      default: 4,
    },

    selectedValue: {
      type: String,
      default: '',
    },

    options: {
      type: Array,

      default() {
        return [];
      },
    },
  },

  methods: {
    isSelected(value) {
      return value === this.selectedValue;
    },

    handleChange(event) {
      let selected = event.target.value;
      this.$emit('select', selected);
    },
  },
};
</script>

<style>
</style>
