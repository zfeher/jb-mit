<template>
  <div :id="id" :style="{ boxSizing: 'border-box', padding: '10px', border: '1px solid #999' }" >
    <div :style="rowStyle">
      <Labell :text="depFlightLabel" width="230px" />
    </div>

    <div :style="rowStyle">
      <ListBox
          id="departure-flight"
          @select="$emit('selectDepartureFlight', $event)"
          :options="depFlightOptions"
          :selectedValue="departureFlight"
          width="230px"
        />
    </div>

    <div :style="rowStyle">
      <Labell text="Return Date" />
    </div>

    <div :style="rowStyle">
      <DatePicker
        id="return-date-after"
        @select="$emit('selectReturnDate', $event)"
        :min="returnDate.min"
        :max="returnDate.max"
        :selected="returnDate.value"
      />
      <ErrorMessage v-if="returnDate.error" :message="returnDate.error" />
    </div>

    <div :style="rowStyle">
      <Labell :text="retFlightLabel" width="230px" />
    </div>

    <div :style="rowStyle">
      <ListBox
        id="return-flight"
        @select="$emit('selectReturnFlight', $event)"
        :options="retFlightOptions"
        :selectedValue="returnFlight"
        width="230px"
      />
    </div>

  </div>
</template>

<script>
import * as R from 'ramda';
import { strToDate, dateToDateStr, isoDateStrToShortTimeStr } from '../common';
import { DatePicker, ErrorMessage, Labell, ListBox } from '../components';

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

    departureFlights: {
      type: Array,
      default: [],
    },

    departureFlight: {
      type: String,
      default: '',
    },

    returnDate: {
      type: Object,
      default() {
        return {
          value: '',
          min: '',
          max: '',
          error: '',
        };
      },
    },

    returnFlights: {
      type: Array,
      default: [],
    },

    returnFlight: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      rowStyle: {
        padding: '4px',
      },
    };
  },

  computed: {
    depFlightLabel() {
      let { origin, destination, departureDate } = this;
      let date = formatFlightDate(departureDate);
      return `${origin} => ${destination} on ${date}`;
    },

    depFlightOptions() {
      return R.map(flightToFlightOption, this.departureFlights);
    },

    retFlightLabel() {
      let { origin, destination, returnDate } = this;
      let date = formatFlightDate(returnDate.value);
      return `${destination} => ${origin} on ${date}`;
    },

    retFlightOptions() {
      return R.map(flightToFlightOption, this.returnFlights);
    },
  },

  methods: {
  },
};
</script>

<style>
</style>
