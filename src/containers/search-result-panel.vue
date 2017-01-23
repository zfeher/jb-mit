<template>
  <div :id="id" :style="{ boxSizing: 'border-box', padding: '10px', border: '1px solid #999' }" >
    <div :style="rowStyle">
      <Labell :text="depFlightLabel" width="230px" />
    </div>

    <div :style="rowStyle">
      <ListBox
          id="departure-flight"
          @select="handleDepFlightSelect($event)"
          :options="depFlightOptions"
          :selectedValue="departureFlight"
          width="230px"
        />
    </div>

    <template v-if="showReturnDatePicker">
      <div :style="rowStyle">
        <Labell text="Return Date" />
      </div>

      <div :style="rowStyle">
        <DatePicker
          :id="returnDate.id"
          @select="handleReturnDateSelect($event)"
          :min="returnDateMin"
          :max="returnDate.max"
          :selected="returnDate.value"
        />
        <ErrorMessage v-if="true" :message="returnDate.error" />
      </div>
    </template>

    <template v-if="showReturnFlights" >
      <div :style="rowStyle">
        <Labell :text="retFlightLabel" width="230px" />
      </div>

      <div :style="rowStyle">
        <ListBox
          id="return-flight"
          @select="handleRetFlightSelect($event)"
          :options="retFlightOptions"
          :selectedValue="returnFlight"
          width="230px"
        />
      </div>
    </template>

    <div :style="rowStyle">
      <button @click="handleStartOverClick">Start Over</button>
    </div>

  </div>
</template>

<script>
import * as R from 'ramda';
import { DatePicker, ErrorMessage, Labell, ListBox } from '../components';
import { MAX_FLIGHT_DATE } from '../config';
import { isNotEmpty, todayDateStr, isoDateStrToShortTimeStr, strToDate, dateToDateStr } from '../common';
import { validate, checkDateStrGte } from '../validator';

let __ = R.__;
let today = todayDateStr();
let formatFlightDate = R.compose(dateToDateStr, strToDate);

let flightToFlightOption = flight => {
  let { departure, arrival, flightNumber, remainingTickets } = flight;
  let departureTime = isoDateStrToShortTimeStr(departure);
  let arrivalTime = isoDateStrToShortTimeStr(arrival);

  return {
    text: `${departureTime} - ${arrivalTime}: ${remainingTickets} tickets`,
    value: flightNumber,
  };
};

let validateReturnDate = (departureDate, today, value) =>
  validate(
    [
      checkDateStrGte('return date', 'departure date', __, departureDate),
      checkDateStrGte('return date', 'today', __, today)
    ],
    value,
);

export default {
  name: 'SearchResultPanel',

  components: {
    DatePicker,
    ErrorMessage,
    Labell,
    ListBox,
  },

  props: {
    id: {
      type: String,
      required: true,
    },

    origin: {
      type: String,
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },

    departureDate: {
      type: String,
      required: true,
    },

    initReturnDate: {
      type: String,
      default: '',
    },

    departureFlights: {
      type: Array,
      default: [],
    },

    initReturnFlights: {
      type: Array,
      default: [],
    },
  },

  data() {
    return {
      returnDate: {
        id: 'return-date',
        value: this.initReturnDate,
        max: MAX_FLIGHT_DATE,
        error: '',
      },

      returnFlights: this.initReturnFlights,

      departureFlight: '',
      returnFlight: '',

      rowStyle: {
        padding: '4px',
      },
    };
  },

  computed: {
    showReturnDatePicker() {
      return R.isEmpty(this.initReturnDate);
    },

    showReturnFlights() {
      return isNotEmpty(this.returnDate.value);
    },

    returnDateMin() {
      let depDate = this.departureDate;
      return depDate ? depDate : MAX_FLIGHT_DATE;
    },

    depFlightOptions() {
      return R.map(flightToFlightOption, this.departureFlights);
    },

    retFlightOptions() {
      return R.map(flightToFlightOption, this.returnFlights);
    },

    depFlightLabel() {
      let { origin, destination, departureDate } = this;
      let date = formatFlightDate(departureDate);
      return `${origin} => ${destination} on ${date}`;
    },

    retFlightLabel() {
      let { origin, destination, returnDate } = this;
      let date = formatFlightDate(returnDate.value);
      return `${destination} => ${origin} on ${date}`;
    },
  },

  methods: {
    handleReturnDateSelect(selected) {
      // TODO ramda way
      this.returnDate.value = selected;
      this.returnDate.error = validateReturnDate(this.departureDate, today, this.returnDate.value);


      // TODO init search if valid
      if (isNotEmpty(this.returnDate.error)) {
        // TODO search
        // TODO debounce ?

      } else {
        this.returnFlights = [];
      }

    },

    handleDepFlightSelect(selected) {
      this.departureFlight = selected;
    },

    handleRetFlightSelect(selected) {
      this.returnFlight = selected;
    },

    handleStartOverClick() {
      this.$emit('resetClick');
    },
  },

  watch: {
    initReturnFlights(value) {
      this.returnFlights = value;
    },
  },
};
</script>

<style>
</style>
