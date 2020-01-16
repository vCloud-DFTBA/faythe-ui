<template>
  <md-card>
    <div class="md-layout">
      <div class="md-layout-item">
        <md-field>
          <label>Cloud provider</label>
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
      </div>
    </div>
    <div class="md-layout">
      <div class="md-layout-item">
        <md-field>
          <label>Query</label>
          <md-input v-model="query" required></md-input>
        </md-field>
      </div>
    </div>
    <div class="md-layout">
      <div class="md-layout-item">
        <md-field>
          <label>Interval</label>
          <md-input v-model="interval" required></md-input>
        </md-field>
      </div>
      <div class="md-layout-item">
        <md-field>
          <label>Duration</label>
          <md-input v-model="duration" required></md-input>
        </md-field>
      </div>
      <div class="md-layout-item">
        <md-field>
          <label>Cooldown</label>
          <md-input v-model="cooldown"></md-input>
        </md-field>
      </div>
      <div class="md-layout-item">
        <md-radio v-model="active" :value="true">Active</md-radio>
        <md-radio v-model="active" :value="false">Inactive</md-radio>
      </div>
    </div>
    <div class="md-layout">
      <div class="md-layout-item">
        <md-field>
          <label>Description</label>
          <md-input v-model="description"></md-input>
        </md-field>
      </div>
      <div class="md-layout-item">
        <md-chips v-model="tags" md-placeholder="Add tags..."></md-chips>
      </div>
    </div>

    <md-card>
      <md-card-header data-background-color="green">
        <h5 class="title">Scaler actions</h5>
      </md-card-header>
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item" style="text-align: right;">
            <md-button class="md-success" @click.native="addAction"
              >Add</md-button
            >
          </div>
        </div>

        <template v-for="n in numActions">
          <div class="md-layout" :key="`layout_1-${n}`">
            <div class="md-layout-item">
              <md-radio
                v-model="action.type[n]"
                value="http"
                :key="`actionType_1-${n}`"
                :id="`actionType_1-${n}`"
                >HTTP</md-radio
              >
            </div>
            <div class="md-layout-item">
              <md-field>
                <label>Attempts</label>
                <md-input
                  v-model="action.attempts[n]"
                  type="number"
                  :key="`attempts-${n}`"
                  :id="`attempts-${n}`"
                ></md-input>
              </md-field>
            </div>
            <div class="md-layout-item">
              <md-field>
                <label>Delay</label>
                <md-input
                  v-model="action.delay[n]"
                  :key="`delay-${n}`"
                  :id="`delay-${n}`"
                ></md-input>
              </md-field>
            </div>
            <div class="md-layout-item">
              <md-field>
                <label>Delay type</label>
                <md-input
                  v-model="action.delay_type[n]"
                  :key="`delay_type-${n}`"
                  :id="`delay_type-${n}`"
                ></md-input>
              </md-field>
            </div>
            <div class="md-layout-item">
              <md-field>
                <label>Method</label>
                <md-select
                  v-model="action.method[n]"
                  :key="`method-${n}`"
                  :id="`method-${n}`"
                >
                  <md-option value="GET">GET</md-option>
                  <md-option value="POST">POST</md-option>
                  <md-option value="DELETE">DELETE</md-option>
                  <md-option value="PUT">PUT</md-option>
                  <md-option value="PATCH">PATCH</md-option>
                </md-select>
              </md-field>
            </div>
            <div class="md-layout-item">
              <md-field>
                <label>URL</label>
                <md-input
                  v-model="action.url[n]"
                  required
                  :key="`url-${n}`"
                  :id="`url-${n}`"
                ></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-layout">
              <div class="md-layout-item" style="text-align: center;">
                <md-button
                  class="md-accent"
                  style="background-color: #ff5252 !important;"
                  @click.native="deleteAction(n)"
                  >Delete</md-button
                >
              </div>
            </div>
          </div>
        </template>
      </md-card-content>
    </md-card>
    <div class="md-layout">
      <div class="md-layout-item" style="text-align: center;">
        <md-button class="md-raised md-primary" @click.native="previewJSON"
          >Preview</md-button
        >
        <md-button
          class="md-raised md-success"
          type="submit"
          @click.prevent="createScaler"
        >
          Submit
        </md-button>
      </div>
    </div>
    <preview-data></preview-data>
    <md-dialog-alert
      :md-active.sync="alertFailed"
      :md-content="errorMessage"
      :md-title="errorTitle"
    />
    <md-dialog-alert
      :md-active.sync="alertSuccess"
      md-title="Scaler created!"
      md-content="Your Scaler has been registered!"
    />
  </md-card>
</template>

<script>
import axios from "axios";
import PreviewData from "../Dialog/PreviewData.vue";

export default {
  name: "create-scaler-card",
  components: {
    PreviewData
  },
  data() {
    return {
      clouds: [],
      selectedProvider: null,
      alertSuccess: false,
      alertFailed: false,
      numActions: [0],
      actionIndex: 1,
      errorMessage: "",
      errorTitle: "",
      // scaler
      query: "",
      duration: "",
      interval: "",
      active: false,
      cooldown: "600ms",
      description: "",
      tags: [],
      actions: {},
      action: {
        url: [],
        type: ["http"],
        method: ["POST"],
        attempts: [10],
        delay: ["100ms"],
        delay_type: ["fixed"]
      }
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
    previewJSON() {
      let body = this.formBody();
      this.$root.$emit("preview_data", body);
    },
    createScaler() {
      if (this.selectedProvider == null) {
        this.errorTitle = "Oops!!";
        this.errorMessage = "cloud provider cannot be empty!";
        this.alertFailed = true;
        return;
      }
      axios
        .post(
          "/scalers/" + this.selectedProvider.split("-")[1].replace(" ", ""),
          this.formBody()
        )
        .then(response => {
          if (response.data.Status != "OK") {
            this.errorMessage = response.data.Err;
            this.errorTitle = response.data.Status;
            this.alertFailed = true;
          } else {
            this.alertSuccess = true;
          }
        })
        .catch(error => {
          this.errorMessage = "There is something wrong!";

          this.errorTitle = "Oops!!";
          this.alertFailed = true;
        });
    },
    addAction() {
      this.numActions.push(this.actionIndex);
      this.actionIndex++;
      this.action.method.push("POST");
      this.action.type.push("http");
      this.action.delay.push("100ms");
      this.action.delay_type.push("fixed");
      this.action.attempts.push(10);
    },
    deleteAction(n) {
      this.numActions = this.numActions.filter(function(value, index, arr) {
        return value != n;
      });
    },
    formBody() {
      let self = this;
      this.actions = {};
      this.numActions.forEach(function(v, i, arr) {
        self.actions[v] = {
          attempts: self.action.attempts[v],
          delay: self.action.delay[v],
          delay_type: self.action.delay_type[v],
          type: self.action.type[v],
          method: self.action.method[v],
          url: self.action.url[v]
        };
      });
      let body = {
        query: this.query,
        interval: this.interval,
        duration: this.duration,
        cooldown: this.cooldown,
        active: this.active,
        actions: this.actions,
        description: this.description,
        tags: this.tags
      };
      return body;
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
