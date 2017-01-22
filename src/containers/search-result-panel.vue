<template>
  <div :id="id" >
    <Labell text="Departure Flights" />
    <ListBox
      id="departure-flight"
      @select="handleDepFlightSelect($event)"
      :options="depFlightOptions"
      :selectedValue="departureFlight"
    />

    <Labell text="Return Flights" />
    <ListBox
      id="return-flight"
      @select="handleRetFlightSelect($event)"
      :options="retFlightOptions"
      :selectedValue="returnFlight"
    />
  </div>
</template>

<script>
import { Labell, ListBox } from '../components';

export default {
  name: 'SearchResultPanel',

  props: {
    id: {
      type: String,
      required: true,
    }
  },

  components: {
    Labell,
    ListBox,
  },

  data() {
    return {
      departureFlight: '',
      returnFlight: '',
    };
  },

  computed: {
    depFlightOptions() {
      return [{
        text: 'dep1',
        value: 'dep1',
      }, {
        text: 'dep2',
        value: 'dep2',
      }];
    },

    retFlightOptions() {
      return [{
        text: 'ret1',
        value: 'ret1',
      }, {
        text: 'ret2',
        value: 'ret2',
      }];
    },
  },

  methods: {
    handleDepFlightSelect(selected) {
      this.departureFlight = selected;
    },

    handleRetFlightSelect(selected) {
      this.returnFlight = selected;
    },
  },
};
</script>

<style>
</style>
