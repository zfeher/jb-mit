<template>
  <select
      :id="id"
      @change="handleChange($event)"
      :disabled="disabled"
      :style="{ width }" >
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
  name: 'ComboBox',

  props: {
    id: {
      type: String,
      required: true,
    },

    width: {
      type: String,
      default: '200px',
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    selectedValue: {
      type: String,
      default: '',
    },

    options: {
      type: Array,

      default() {
        return [{
          text: '',
          value: '',
        }];
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
