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
          <label>Name</label>
          <md-input v-model="name" required></md-input>
        </md-field>
      </div>
    </div>
    <div class="md-layout">
      <div class="md-layout-item">
        <md-field>
          <label>Pattern</label>
          <md-input v-model="pattern" required></md-input>
        </md-field>
      </div>
      <div class="md-layout-item">
        <md-field>
          <label>TTL</label>
          <md-input v-model="ttl" required></md-input>
        </md-field>
      </div>
    </div>
    <div class="md-layout">
      <div class="md-layout-item">
        <md-chips v-model="tags" md-placeholder="Add tags..."></md-chips>
      </div>
      <div class="md-layout-item">
        <md-field>
          <label>Description</label>
          <md-input v-model="description"></md-input>
        </md-field>
      </div>
    </div>

    <div class="md-layout">
      <div class="md-layout-item" style="text-align: center;">
        <md-button class="md-raised md-primary" @click.native="previewJSON"
          >Preview</md-button
        >
        <md-button
          class="md-raised md-success"
          type="submit"
          @click.prevent="createSilence"
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
      md-title="Silence created!"
      md-content="Your silence has been registered!"
    />
  </md-card>
</template>

<script>
import axios from "axios";
import PreviewData from "../Dialog/PreviewData";

export default {
  name: "create-silence-card",
  components: {
    PreviewData
  },
  data() {
    return {
      clouds: [],
      selectedProvider: null,
      alertSuccess: false,
      alertFailed: false,
      errorMessage: "",
      errorTitle: "",
      // silence
      name: "",
      ttl: "",
      pattern: "",
      tags: [],
      description: ""
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
    createSilence() {
      if (this.selectedProvider == null) {
        this.errorTitle = "Oops!!";
        this.errorMessage = "cloud provider cannot be empty!";
        this.alertFailed = true;
        return;
      }
      axios
        .post(
          "/silences/" + this.selectedProvider.split("-")[1].replace(" ", ""),
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
    formBody() {
      let body = {
        name: this.name,
        pattern: this.pattern,
        ttl: this.ttl,
        tags: this.tags,
        description: this.description
      };
      return body;
    }
  }
};
</script>
