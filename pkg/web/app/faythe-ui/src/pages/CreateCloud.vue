<template>
  <div class="content">
    <form class="md-layout" @submit.prevent="createCloud">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Cloud Provider</h4>
          </md-card-header>
          <md-card-content>
            <md-autocomplete
              v-model="provider"
              :md-options="providers"
              md-layout="box"
              md-dense
              required
            >
              <label>Provider</label>
            </md-autocomplete>
            <md-chips v-model="tags" md-placeholder="Add tags..."></md-chips>
          </md-card-content>
        </md-card>
      </div>
      <monitor-card ref="monitor"></monitor-card>
      <auth-card ref="auth"></auth-card>
      <atengine-card ref="atengine"></atengine-card>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
        style="text-align: center;"
      >
        <md-button class="md-raised md-primary" @click="previewJSON"
          >Preview</md-button
        >
        <md-button
          class="md-raised md-success"
          type="submit"
        >
          Submit
        </md-button>
      </div>
    </form>
    <preview-data></preview-data>
  </div>
</template>

<script>
import axios from "axios";
import { AuthCard, MonitorCard, AtengineCard, PreviewData } from "@/components";

export default {
  name: "CloudCreate",
  components: { AuthCard, MonitorCard, AtengineCard, PreviewData },
  data: () => ({
    provider: null,
    providers: ["openstack"],
    tags: ["openstack"],
  }),
  methods: {
    previewJSON() {
      let data = {
        provider: this.provider,
        auth: this.$refs.auth.auth,
        monitor: this.$refs.monitor.monitor,
        atengine: this.$refs.atengine.atengine,
        tags: this.tags
      };
      this.$root.$emit("preview_data", data);
    },
    createCloud() {
      axios
        .post("/clouds/create", {
          provider: this.provider,
          auth: this.$refs.auth.auth,
          monitor: this.$refs.monitor.monitor,
          atengine: this.$refs.atengine.atengine,
          tags: this.tags
        })
        .then(response => {
          alert("OK");
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.md-button {
  display: inline-block;
}
</style>
