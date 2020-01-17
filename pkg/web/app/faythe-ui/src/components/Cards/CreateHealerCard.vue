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
          <md-input v-model="query"></md-input>
        </md-field>
      </div>
    </div>

    <div class="md-layout">
      <div class="md-layout-item">
        <md-chips
          v-model="receivers"
          md-placeholder="Add receivers..."
          :key="`receivers`"
          :id="`receivers`"
          required
        ></md-chips>
      </div>
      <div class="md-layout-item">
        <md-chips v-model="tags" md-placeholder="Add tags..."></md-chips>
      </div>
    </div>
    <div class="md-layout">
      <div class="md-layout-item">
        <md-field>
          <label>Interval</label>
          <md-input v-model="interval"></md-input>
        </md-field>
      </div>
      <div class="md-layout-item">
        <md-field>
          <label>Duration</label>
          <md-input v-model="duration"></md-input>
        </md-field>
      </div>
      <div class="md-layout-item">
        <md-field>
          <label>Evaluation Level</label>
          <md-input v-model="evaluation_level" type="number"></md-input>
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
    </div>
    <md-card>
      <md-card-header data-background-color="green">
        <h5 class="title">Healer actions</h5>
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
                v-model="actionType[n]"
                value="mail"
                :key="`actionType_1-${n}`"
                :id="`actionType_1-${n}`"
                >Mail</md-radio
              >
              <md-radio
                v-model="actionType[n]"
                value="http"
                :key="`actionType_2-${n}`"
                :id="`actionType_2-${n}`"
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
          <template v-if="actionType[n] == 'mail'">
            <div class="md-layout" :key="`layout_2-${n}`" :id="`layout_2-${n}`">
              <div class="md-layout-item">
                <p>
                  Send notification about healing actions triggered to
                  receivers.
                </p>
                <p>Recommendation: One Mail Action per healer.</p>
              </div>
            </div>
          </template>
          <template v-else-if="actionType[n] == 'http'">
            <div class="md-layout" :key="`layout_3-${n}`">
              <div class="md-layout-item">
                <md-field>
                  <label>Method</label>
                  <md-select
                    v-model="http.method[n]"
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
                    v-model="http.url[n]"
                    required
                    :key="`url-${n}`"
                    :id="`url-${n}`"
                  ></md-input>
                </md-field>
              </div>
            </div>
          </template>
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
          @click.prevent="createHealer"
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
      md-title="Healer created!"
      md-content="Your healer has been registered!"
    />
  </md-card>
</template>

<script>
import axios from "axios";
import PreviewData from "../Dialog/PreviewData.vue";

export default {
  name: "create-healer-card",
  components: {
    PreviewData
  },
  data() {
    return {
      clouds: [],
      selectedProvider: null,
      actionType: [],
      alertSuccess: false,
      alertFailed: false,
      numActions: [0],
      actionIndex: 1,
      errorMessage: "",
      errorTitle: "",
      // healer information
      query: 'up{job=~".compute-cadvisor.|.compute-node."} < 1',
      receivers: [],
      interval: "18s",
      duration: "3m",
      evaluation_level: 2,
      description: null,
      tags: [],
      active: false,
      actions: {},
      mail: {
        type: "mail"
      },
      http: {
        type: "http",
        method: ["POST"],
        url: []
      },
      action: {
        attempts: [10],
        delay_type: ["fixed"],
        delay: ["100ms"]
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
    createHealer() {
      if (this.selectedProvider == null) {
        this.errorTitle = "Oops!!";
        this.errorMessage = "cloud provider cannot be empty!";
        this.alertFailed = true;
        return;
      }
      axios
        .post(
          "/healers/" + this.selectedProvider.split("-")[1].replace(" ", ""),
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
      this.http.method.push("POST");
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
          delay_type: self.action.delay_type[v]
        };
        if (self.actionType[v] == "mail") {
          self.actions[v].type = "mail";
        } else if (self.actionType[v] == "http") {
          self.actions[v].type = "http";
          self.actions[v].method = self.http.method[v];
          self.actions[v].url = self.http.url[v];
        }
      });
      let body = {
        query: this.query,
        interval: this.interval,
        receivers: this.receivers,
        duration: this.duration,
        evaluation_level: this.evaluation_level,
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
