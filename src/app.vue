<template>
  <div id="app">
    <ComboBox
      id="origin"
      @select="handleOriginSelect($event)"
      label="Origin"
      :options="originOptions"
      :selectedValue="origin"
    />

    <ComboBox
      id="destination"
      @select="handleDestinationSelect($event)"
      label="Destination"
      :options="destOptions"
      :selectedValue="destination"
      :disabled="destDisabled"
    />
  </div>
</template>

<script>
import { ComboBox } from './components';

export default {
  name: 'App',

  components: {
    ComboBox,
  },

  data() {
    return {
      origin: '',
      destination: '',
    };
  },

  computed: {
    originOptions() {
      return [{
        text: '',
        value: '',
      }, {
        text: 'orig1',
        value: 'orig1',
      }, {
        text: 'orig2',
        value: 'orig2',
      }];
    },

    destOptions() {
      // TODO FPish
      if (this.origin) {
        return [{
          text: '',
          value: '',
        }, {
          text: 'dest1',
          value: 'dest1',
        }, {
          text: 'dest2',
          value: 'dest2',
        }];
      } else {
        return [{
          text: '',
          value: '',
        }];
      }
    },

    destDisabled() {
      return !this.origin;
    },
  },

  methods: {
    handleOriginSelect(selected) {
      this.origin = selected;
      this.destination = '';
    },

    handleDestinationSelect(selected) {
      this.destination = selected;
    },
  },
};
</script>

<style>
</style>
