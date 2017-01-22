<template>
  <div :id="id" :style="{ boxSizing: 'border-box', padding: '10px', border: '1px solid #999' }" >
    <div :style="rowStyle">
      <Labell text="Origin" />
      <ComboBox
        :id="origin.id"
        @select="handleOriginSelect($event)"
        :options="originOptions"
        :selectedValue="origin.value"
      />
      <ErrorMessage v-if="true" :message="origin.error" />
    </div>

    <div :style="rowStyle">
      <Labell text="Destination" />
      <ComboBox
        :id="destination.id"
        @select="handleDestinationSelect($event)"
        :options="destOptions"
        :selectedValue="destination.value"
        :disabled="destDisabled"
      />
      <ErrorMessage v-if="true" :message="destination.error" />
    </div>

    <div :style="rowStyle">
      <Labell text="Departure Date" />
      <DatePicker
        :id="departureDate.id"
        @select="handleDepartureDateSelect($event)"
        :min="departureDate.min"
        :max="departureDate.max"
        :selected="departureDate.value"
      />
      <ErrorMessage v-if="true" :message="departureDate.error" />
    </div>

    <div :style="rowStyle">
      <Labell text="Return Date" />
      <DatePicker
        :id="returnDate.id"
        @select="handleReturnDateSelect($event)"
        :min="minReturnDate"
        :max="returnDate.max"
        :selected="returnDate.value"
      />
      <ErrorMessage v-if="true" :message="returnDate.error" />
    </div>

    <div :style="rowStyle">
      <button @click="handleSearchClick">Search</button>
    </div>

  </div>
</template>

<script>
import { Labell, ComboBox, DatePicker, ErrorMessage } from '../components';
import { dateStrGt, todayDateStr } from '../common';

let MAX_DATE = '2018-12-31';
let today = todayDateStr();

export default {
  name: 'SearchPanel',

  components: {
    ComboBox,
    DatePicker,
    ErrorMessage,
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
      origin: {
        id: 'origin',
        value: '',
        error: 'something is wrong',
      },

      destination: {
        id: 'destination',
        value: '',
        error: 'something is wrong',
      },

      departureDate: {
        id: 'departure-date',
        value: today,
        min: today,
        max: MAX_DATE,
        error: 'something is wrong',
      },

      returnDate: {
        id: 'return-date',
        value: '',
        max: MAX_DATE,
        error: 'something is wrong',
      },

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
      if (this.origin.value) {
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
      return !this.origin.value;
    },

    minReturnDate() {
      let depDate = this.departureDate.value;
      return depDate ? depDate : MAX_DATE;
    },
  },

  methods: {
    handleOriginSelect(selected) {
      // TODO ramda way
      this.origin.value = selected;
      // TODO ramda way
      this.destination.value = '';
    },

    handleDestinationSelect(selected) {
      // TODO ramda way
      this.destination.value = selected;
    },

    handleDepartureDateSelect(selected) {
      // TODO ramda way
      this.departureDate.value = selected;

      if (dateStrGt(this.departureDate.value, this.returnDate.value)) {
        // TODO ramda way
        this.returnDate.value = '';
      }
    },

    handleReturnDateSelect(selected) {
      // TODO ramda way
      this.returnDate.value = selected;
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
