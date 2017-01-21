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

    <DatePicker
      id="departureDate"
      @select="handleDepartureDateSelect($event)"
      :min="minDepartureDate"
      :max="maxDepartureDate"
      :selected="departureDate"
    />

    <DatePicker
      id="returnDate"
      @select="handleReturnDateSelect($event)"
      :min="minReturnDate"
      :max="maxReturnDate"
      :selected="returnDate"
    />
  </div>
</template>

<script>
import * as R from 'Ramda';
import { ComboBox, DatePicker } from './components';
import { dateStrGt, todayDateStr } from './common';

let MAX_DATE = '2018-12-31';
let today = todayDateStr();

export default {
  name: 'App',

  components: {
    ComboBox,
    DatePicker,
  },

  data() {
    return {
      origin: '',
      destination: '',
      departureDate: today,
      minDepartureDate: today,
      maxDepartureDate: MAX_DATE,
      returnDate: '',
      maxReturnDate: MAX_DATE,
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

    minReturnDate() {
      let departureDate = this.departureDate;
      return departureDate ? departureDate : MAX_DATE;
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

    handleDepartureDateSelect(selected) {
      this.departureDate = selected;

      if (dateStrGt(this.departureDate, this.returnDate)) {
        this.returnDate = '';
      }
    },

    handleReturnDateSelect(selected) {
      this.returnDate = selected;
    },
  },
};
</script>

<style>
</style>
