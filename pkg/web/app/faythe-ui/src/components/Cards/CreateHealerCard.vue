<template>
  <md-card>
    <form @submit.prevent="createHealer">
      <div class="md-layout">
        <div class="md-layout-item">
          <md-field>
            <label>Cloud provider</label>
            <md-select v-model="selectedProvider" required>
              <md-option v-for="(cloud, index) in clouds" :value="cloud" :key="`cloud-${index}`">
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
            <div class="md-layout-item">
              <md-radio v-model="actionType" value="mail">Mail</md-radio>
              <md-radio v-model="actionType" value="http">HTTP</md-radio>
            </div>
            <div class="md-layout-item">
              <md-field>
                <label>Attempts</label>
                <md-input v-model="action.attempts" type="number"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item">
              <md-field>
                <label>Delay</label>
                <md-input v-model="action.delay"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item">
              <md-field>
                <label>Delay type</label>
                <md-input v-model="action.delay_type"></md-input>
              </md-field>
            </div>
          </div>
          <template v-if="actionType == 'mail'">
            <div class="md-layout">
              <div class="md-layout-item">
                <md-chips
                  v-model="mail.receivers"
                  md-placeholder="Add receivers..."
                  required
                >
                  <div class="md-helper-text">
                    If this is left empty, healer receivers will be taken.
                  </div></md-chips
                >
              </div>
            </div>
          </template>
          <template v-else-if="actionType == 'http'">
            <div class="md-layout">
              <div class="md-layout-item">
                <md-field>
                  <label>Method</label>
                  <md-select v-model="http.method">
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
                  <md-input v-model="http.url" required></md-input>
                </md-field>
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
          <md-button class="md-raised md-success" type="submit">
            Submit
          </md-button>
        </div>
      </div>
    </form>
    <preview-data></preview-data>
    <md-dialog-alert
      :md-active.sync="alertFailed"
      md-content="There is something wrong!"
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
      actionType: null,
      alertSuccess: null,
      alertFail: null,
      // healer information
      query: 'up{job=~".compute-cadvisor.|.compute-node."} < 1',
      receivers: [],
      interval: "18s",
      duration: "3m",
      description: null,
      tags: [],
      active: false,
      actions: {},
      mail: {
        type: "mail",
        receivers: null
      },
      http: {
        type: "http",
        method: "POST",
        url: null
      },
      action: {
        attempts: 10,
        delay_type: "fixed",
        delay: "100ms"
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
      let data = {
        query: this.query,
        receivers: this.receivers,
        interval: this.interval,
        duration: this.duration,
        active: this.active,
        actions: this.actions,
        description: this.description,
        tags: this.tags
      };
      this.$root.$emit("preview_data", data);
    },
    createHealer() {
      axios
        .post(
          "/healers/" + this.selectedProvider.split("-")[1].replace(" ", ""),
          {}
        )
        .then(response => {
          this.alertSuccess = true;
        })
        .catch(error => {
          this.alertFailed = true;
        });
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
