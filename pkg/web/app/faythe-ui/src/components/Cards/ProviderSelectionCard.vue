<template>
  <div>
    <form @submit.prevent="fetchChildComp">
      <md-field>
        <label for="movie">Cloud provider</label>
        <md-select v-model="selectedProvider" required>
          <md-option
            v-for="(cloud, index) in clouds"
            :value="cloud"
            :key="`cloud-${index}`"
          >
            {{ cloud }}
          </md-option>
        </md-select>
      </md-field>
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
<style lang="scss">
.md-menu-content {
  min-width: 82%;
  max-width: 82%;
}
</style>
