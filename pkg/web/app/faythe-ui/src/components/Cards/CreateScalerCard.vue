<template>
  <md-card>
    <form @submit.prevent="createScaler">
      <md-field>
        <label>Cloud provider</label>
        <md-select v-model="selectedProvider" required>
          <md-option v-for="cloud in clouds" :value="cloud" :key="cloud">
            {{ cloud }}
          </md-option>
        </md-select>
      </md-field>

      <md-field>
        <label>Query</label>
        <md-textarea v-model="query" required></md-textarea>
      </md-field>

      <div class="md-layout"></div>
    </form>
  </md-card>
</template>

<script>
import axios from "axios";

export default {
  name: "create-scaler-card",
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
  }
};
</script>

<style lang="scss">
.md-menu-content {
  min-width: 82%;
  max-width: 82%;
}
</style>
