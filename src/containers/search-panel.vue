<template>
  <div :id="id" :style="{ boxSizing: 'border-box', padding: '10px', border: '1px solid #999' }" >
    <div :style="rowStyle">
      <Labell text="Origin" />
      <ComboBox
        id="origin"
        @select="$emit('selectOrigin', $event)"
        :options="originOptions"
        :selectedValue="origin.value"
      />
      <ErrorMessage v-if="origin.error" :message="origin.error" />
    </div>
  </div>
</template>

<script>
import * as R from 'ramda';
import { ComboBox, ErrorMessage, Labell } from '../components';
import { getCitiesWithConnections } from '../services';

let cityToCityOption = city => ({
  text: city.shortName,
  value: city.iata,
});

export default {
  name: 'SearchPanel',

  components: {
    ComboBox,
    ErrorMessage,
    Labell,
  },

  props: {
    id: {
      type: String,
      required: true,
    },

    origin: {
      type: Object,
      default() {
        return {
          value: '',
          error: '',
        };
      },
    },
  },

  data() {
    return {
      citiesWithConnections: [],

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
  },

  methods: {
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
