<template>
  <div :id="id" :style="{ boxSizing: 'border-box', padding: '10px', border: '1px solid #999' }" >
    <div :style="rowStyle">
      <Labell :text="depFlightLabel" width="230px" />
    </div>
  </div>
</template>

<script>
import * as R from 'ramda';
import { strToDate, dateToDateStr } from '../common';
import { DatePicker, ErrorMessage, Labell, ListBox } from '../components';

let formatFlightDate = R.compose(dateToDateStr, strToDate);

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
  },

  methods: {
  },
};
</script>

<style>
</style>
