<template>
  <div>
    <form @submit.prevent="fetchChildComp">
      <md-autocomplete v-model="selectedProvider" :md-options="clouds" required>
        <label>Cloud provider</label>
      </md-autocomplete>
      <md-button class="md-raised md-success" type="submit" style="float:right">
        View
      </md-button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "provider-selection-card",
  data() {
    return {
      clouds: [],
      selectedProvider: null
    };
  },
  mounted() {
    axios.get("/clouds").then(response => {
      let arr = [];
      let tmp = response.data.Data;
      for (let key in tmp) {
        let tc = tmp[key];
        arr.push(tc.provider + " - " + tc.id + " - " + tc.auth.auth_url);
      }
      this.clouds = arr;
    });
  },
  methods: {
    fetchChildComp() {
      this.$root.$emit("fetch_child_components", this.selectedProvider);
    }
  }
};
</script>
