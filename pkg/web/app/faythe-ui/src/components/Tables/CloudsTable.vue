<template>
  <div>
    <md-table
      v-model="clouds"
      :table-header-color="tableHeaderColor"
      @md-selected="onSelect">
      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
        md-selectable="single">
        <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Type">{{ item.provider }}</md-table-cell>
        <md-table-cell md-label="Auth">{{ item.auth.auth_url }}</md-table-cell>
        <md-table-cell md-label="Monitor">{{ item.monitor.address }}</md-table-cell>
        <md-table-cell md-label="ATEngine">{{ item.atengine.address }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "clouds-table",
  props: {
     tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      clouds: []
    };
  },
  mounted() {
    axios.get("/clouds").then(response => {
      let arr = [];
      let tmp = response.data.Data;
      for (let key in tmp) {
        arr.push(tmp[key]);
      }
      this.clouds = arr;
    });
  },
  methods: {
    onSelect(item) {
      this.$root.$emit('open_cloud_details', item);
    }
  }
};
</script>
