<template>
  <div>
    <form @submit.prevent="createChildComp">
      <md-autocomplete v-model="selectedProvider" :md-options="clouds" required>
        <label>Cloud provider</label>
      </md-autocomplete>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "provider-selection-without-btn-card",
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
    createChildComp() {
      this.$root.$emit("create_child_components", this.selectedProvider);
    }
  }
};
</script>
