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
      <ErrorMessage v-if="origin.error" :message="origin.error" />
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
      <ErrorMessage v-if="destination.error" :message="destination.error" />
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
      <ErrorMessage v-if="departureDate.error" :message="departureDate.error" />
    </div>

    <div :style="rowStyle">
      <Labell text="Return Date" />
      <DatePicker
        :id="returnDate.id"
        @select="handleReturnDateSelect($event)"
        :min="returnDateMin"
        :max="returnDate.max"
        :selected="returnDate.value"
      />
      <ErrorMessage v-if="returnDate.error" :message="returnDate.error" />
    </div>

    <div :style="rowStyle">
      <button @click="handleSearchClick">Search</button>
    </div>

  </div>
</template>

<script>
import * as R from 'ramda';
import { Labell, ComboBox, DatePicker, ErrorMessage } from '../components';
import { dateStrGt, todayDateStr } from '../common';
import { validate, checkNotEmpty, checkDateStrGte } from '../validator';
import { MAX_FLIGHT_DATE } from '../config';
import { getCitiesWithConnections, searchFlights } from '../services';

let __ = R.__;
let today = todayDateStr();

let validateOrigin = validate([checkNotEmpty('origin')]);
let validateDestination = validate([checkNotEmpty('destination')]);

let validateDepartureDate = (today, value) =>
  validate(
    [
      checkNotEmpty('departure date'),
      checkDateStrGte('departure date', 'today', __, today)
    ],
    value,
  );

let validateReturnDate = (departureDate, today, value) =>
  validate(
    [
      checkNotEmpty('return date'),
      checkDateStrGte('return date', 'departure date', __, departureDate),
      checkDateStrGte('return date', 'today', __, today)
    ],
    value,
);

let cityToCityOption = city => ({
  text: city.shortName,
  value: city.iata,
});

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
    },

    initOrigin: {
      type: String,
      default: '',
    },

    initDestination: {
      type: String,
      default: '',
    },

    initDepartureDate: {
      type: String,
      default: '',
    },

    initReturnDate: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      citiesWithConnections: [],

      origin: {
        id: 'origin',
        value: this.initOrigin,
        error: '',
      },

      destination: {
        id: 'destination',
        value: this.initDestination,
        error: '',
      },

      departureDate: {
        id: 'departure-date',
        value: this.initDepartureDate,
        min: today,
        max: MAX_FLIGHT_DATE,
        error: '',
      },

      returnDate: {
        id: 'return-date',
        value: this.initReturnDate,
        max: MAX_FLIGHT_DATE,
        error: '',
      },

      rowStyle: {
        padding: '4px',
      },
    };
  },

  computed: {
    originOptions() {
      let emptyItem = { text: '', value: '', };
      return R.compose(
        R.concat([emptyItem]),
        R.map(cityToCityOption),
      )(this.citiesWithConnections);
    },

    destOptions() {
      // TODO FPish
      if (this.origin.value) {
        let emptyItem = { text: '', value: '', };

        // TODO extract
        let originConnections = R.compose(
          R.pluck('iata'),
          R.flatten(),
          R.pluck('connections'),
          R.filter(
            R.propEq('iata', this.origin.value)),
          )(this.citiesWithConnections);

        return R.compose(
          R.concat([emptyItem]),
          R.map(cityToCityOption),
          R.filter(city => R.contains(city.iata, originConnections))
        )(this.citiesWithConnections);

      } else {
        return [{ text: '', value: '' }];
      }
    },

    destDisabled() {
      return !this.origin.value;
    },

    returnDateMin() {
      let depDate = this.departureDate.value;
      return depDate ? depDate : MAX_FLIGHT_DATE;
    },

    valid() {
      let errors = [
        this.origin.error,
        this.destination.error,
        this.departureDate.error,
        this.returnDate.error,
      ];

      return R.all(R.isEmpty, errors);
    }
  },

  watch: {
    'origin.value'(value) {
      this.$emit('selectOrigin', value);
    },

    'destination.value'(value) {
      this.$emit('selectDestination', value);
    },

    'departureDate.value'(value) {
      this.$emit('selectDepartureDate', value);
    },

    'returnDate.value'(value) {
      this.$emit('selectReturnDate', value);
    },

    initOrigin(value) {
      this.origin.value = value;
      this.origin.error = '';
    },

    initDestination: function(value) {
      this.destination.value = value;
      this.destination.error = '';
    },

    initDepartureDate: function(value) {
      this.departureDate.value = value;
      this.departureDate.error = '';
    },

    initReturnDate: function(value) {
      this.returnDate.value = value;
      this.returnDate.error = '';
    },
  },

  methods: {
    handleOriginSelect(selected) {
      // TODO ramda way
      this.origin.value = selected;
      this.origin.error = '';

      // TODO ramda way
      this.destination.value = '';
    },

    handleDestinationSelect(selected) {
      // TODO ramda way
      this.destination.value = selected;
      this.destination.error = '';
    },

    handleDepartureDateSelect(selected) {
      // TODO ramda way
      this.departureDate.value = selected;
      this.departureDate.error = '';

      if (dateStrGt(this.departureDate.value, this.returnDate.value)) {
        // TODO ramda way
        this.returnDate.value = '';
        this.returnDate.error = '';
      }
    },

    handleReturnDateSelect(selected) {
      // TODO ramda way
      this.returnDate.value = selected;
      this.returnDate.error = '';
    },

    handleSearchClick() {
      this.validate();

      if (this.valid) {
        this.search();
      }
    },

    search() {
      let origin = this.origin.value;
      let destination = this.destination.value;
      let depDate = this.departureDate.value;
      let retDate = this.returnDate.value;

      // TODO async/await
      searchFlights(origin, destination, depDate).then(result => {
        this.$emit('searchDepartureFlights', result);
      });

      if (this.returnDate.value) {
        // TODO async/await
        searchFlights(destination, origin, retDate).then(result => {
          this.$emit('searchReturnFlights', result);
        });
      }
    },

    validate() {
      let origin = this.origin.value;
      let destination = this.destination.value;
      let depDate = this.departureDate.value;
      let retDate = this.returnDate.value;

      // TODO ramda way
      this.origin.error = validateOrigin(origin);
      this.destination.error = validateDestination(destination);
      this.departureDate.error = validateDepartureDate(today, depDate);

      if (this.returnDate.value) {
        this.returnDate.error = validateReturnDate(depDate, today, retDate);
      } else {
        this.returnDate.error = '';
      }
    },
  },

  created() {
    // TODO async/await
    getCitiesWithConnections()
      .then(data => this.citiesWithConnections = data);
  },
};
</script>

<style>
</style>
