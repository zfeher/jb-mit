<template>
  <div :id="id" :style="{ boxSizing: 'border-box', padding: '10px', border: '1px solid #999' }" >
    <div :style="rowStyle">
      <Labell text="Origin" />
      <ComboBox
        id="origin"
        @select="handleOriginSelect($event)"
        :options="originOptions"
        :selectedValue="origin"
      />
    </div>

    <div :style="rowStyle">
      <Labell text="Destination" />
      <ComboBox
        id="destination"
        @select="handleDestinationSelect($event)"
        :options="destOptions"
        :selectedValue="destination"
        :disabled="destDisabled"
      />
    </div>

    <div :style="rowStyle">
      <Labell text="Departure Date" />
      <DatePicker
        id="departure-date"
        @select="handleDepartureDateSelect($event)"
        :min="minDepartureDate"
        :max="maxDepartureDate"
        :selected="departureDate"
      />
    </div>

    <div :style="rowStyle">
      <Labell text="Return Date" />
      <DatePicker
        id="return-date"
        @select="handleReturnDateSelect($event)"
        :min="minReturnDate"
        :max="maxReturnDate"
        :selected="returnDate"
      />
    </div>

    <div :style="rowStyle">
      <button @click="handleSearchClick">Search</button>
    </div>

  </div>
</template>

<script>
import { Labell, ComboBox, DatePicker } from '../components';
import { dateStrGt, todayDateStr } from '../common';

let MAX_DATE = '2018-12-31';
let today = todayDateStr();

export default {
  name: 'SearchPanel',

  components: {
    ComboBox,
    DatePicker,
    Labell,
  },

  props: {
    id: {
      type: String,
      required: true,
    }
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
      rowStyle: {
        padding: '4px',
      },
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

    handleSearchClick() {
      console.log('search in progress ...');

      // TODO validate
      // TODO get/fill in depFlightOptions
      // TODO get/fill in retFlightOptions, if return date set
      // TODO show a date picker for return fligth pick, if return date not set
      // TODO get/fill/show retFlightOptions if return date set afterwards
      // TODO emit search event with result
      //  - departure flights
      //  - [return flights]

    }
  },
};
</script>

<style>
</style>
