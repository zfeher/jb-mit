<template>
  <div :id="`${id}-container`">
    <label :for="id">{{ label }}</label>
    <select :id="id" @change="handleChange($event)" :disabled="disabled" >
      <option
          v-for="option in options"
          :value="option.value"
          :selected="isSelected(option.value)" >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'ComboBox',

  props: {
    id: {
      type: String,
      required: true,
    },

    label: String,

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
