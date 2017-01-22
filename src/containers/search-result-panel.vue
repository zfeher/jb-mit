<template>
  <div :id="id" :style="{ boxSizing: 'border-box', padding: '10px', border: '1px solid #999' }" >
    <div :style="rowStyle">
      <Labell text="Departure Flights" />
    </div>

    <div :style="rowStyle">
      <ListBox
          id="departure-flight"
          @select="handleDepFlightSelect($event)"
          :options="depFlightOptions"
          :selectedValue="departureFlight"
        />
    </div>

    <div :style="rowStyle">
      <Labell text="Return Flights" />
    </div>

    <div :style="rowStyle">
      <ListBox
        id="return-flight"
        @select="handleRetFlightSelect($event)"
        :options="retFlightOptions"
        :selectedValue="returnFlight"
      />
    </div>
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
      rowStyle: {
        padding: '4px',
      },
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
