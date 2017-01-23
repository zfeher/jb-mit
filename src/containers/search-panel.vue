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
import { dateStrGt, todayDateStr } from '../common';
import { validate, checkNotEmpty, checkDateStrGte } from '../validator';
import { MAX_FLIGHT_DATE } from '../config';

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
    'origin.value': function(value) {
      this.$emit('selectOrigin', value);
    },

    'destination.value': function(value) {
      this.$emit('selectDestination', value);
    },

    'departureDate.value': function(value) {
      this.$emit('selectDepartureDate', value);
    },

    'returnDate.value': function(value) {
      this.$emit('selectReturnDate', value);
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
      console.log('search in progress ...')

      // TODO async/await usage :)

      // search dep flights
      this.$emit('searchDepartureFlights', [
        {
          carrierCode: 'W6',
          flightNumber: '5873630bf30750acf9367715',
          remainingTickets: 31,
          departure: '2017-02-01T07:40:00+0100',
          arrival: '2017-02-01T10:40:00+0100',
          fares: [
            {
              fareSellKey: '5873630b4095e44baa165108',
              price: 42,
              bundle: 'basic'
            },
            {
              fareSellKey: '5873630b0ecc2de616093ff0',
              price: 49,
              bundle: 'standard'
            },
            {
              fareSellKey: '5873630b785bb8590e190e5b',
              price: 70,
              bundle: 'plus'
            }
          ]
        },
      ]);

      // search ret flights if ret date set
      if (this.returnDate.value) {
        this.$emit('searchReturnFlights', [
          {
            carrierCode: 'W6',
            flightNumber: '5873630bb17f535142498eb4',
            remainingTickets: 43,
            departure: '2017-02-01T10:20:00+0100',
            arrival: '2017-02-01T13:20:00+0100',
            fares: [
              {
                fareSellKey: '5873630bf06ea3c915897d05',
                price: 38,
                bundle: 'basic'
              },
              {
                fareSellKey: '5873630b0c582d4bbae8d505',
                price: 45,
                bundle: 'standard'
              },
              {
                fareSellKey: '5873630bcd101c8ff982ece3',
                price: 73,
                bundle: 'plus'
              }
            ]
          },
        ]);
      }

      // TODO show a date picker for return fligth pick, if return date not set
      // TODO get/fill/show retFlightOptions if return date set afterwards

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
