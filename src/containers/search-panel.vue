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
        :min="returnDateMin"
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
import * as R from 'ramda';
import { Labell, ComboBox, DatePicker, ErrorMessage } from '../components';
import { dateStrGt, dateStrLt, isNotEmpty, todayDateStr } from '../common';

let __ = R.__;

let MAX_DATE = '2018-12-31';
let today = todayDateStr();

let checkNotEmpty = R.curry(
  (name, value) => R.isEmpty(value) ? `${name} should be set` : ''
);

let checkDateStrGte = R.curry(
  (name, otherName, dateStr1, dateStr2) =>
    dateStrLt(dateStr1, dateStr2) ?
      `${name} should be >= ${otherName}` :
      ''
);

let validate = R.curry(
  (checkers, value) => {
    return R.compose(
      R.when(R.isNil, R.always('')),
      R.find(isNotEmpty),
      R.map(checker => checker(value)),
    )(checkers);
  }
);

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
      citiesWithConnections: [],

      origin: {
        id: 'origin',
        value: '',
        error: '',
      },

      destination: {
        id: 'destination',
        value: '',
        error: '',
      },

      departureDate: {
        id: 'departure-date',
        value: today,
        min: today,
        max: MAX_DATE,
        error: '',
      },

      returnDate: {
        id: 'return-date',
        value: '',
        max: MAX_DATE,
        error: '',
      },

      rowStyle: {
        padding: '4px',
      },
    };
  },

  computed: {
    originOptions() {
      return [
        { text: '', value: '', },
        { text: 'orig1', value: 'orig1', },
        { text: 'orig2', value: 'orig2', }
      ];
    },

    destOptions() {
      // TODO FPish
      if (this.origin.value) {
        return [
          { text: '', value: '' },
          { text: 'dest1', value: 'dest1' },
          { text: 'dest2', value: 'dest2' }
        ];
      } else {
        return [{ text: '', value: '' }];
      }
    },

    destDisabled() {
      return !this.origin.value;
    },

    returnDateMin() {
      let depDate = this.departureDate.value;
      return depDate ? depDate : MAX_DATE;
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
      console.log('search in progress ...')

      // TODO get/fill in depFlightOptions
      // TODO get/fill in retFlightOptions, if return date set
      // TODO show a date picker for return fligth pick, if return date not set
      // TODO get/fill/show retFlightOptions if return date set afterwards
      // TODO emit search event with result
      //  - departure flights
      //  - [return flights]

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
};
</script>

<style>
</style>
