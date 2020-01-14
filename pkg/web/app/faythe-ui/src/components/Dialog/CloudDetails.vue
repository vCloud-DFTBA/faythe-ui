<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-tabs class="md-primary" md-card md-dynamic-height>
        <md-tab id="tab-auth" md-label="Auth">
          <md-table v-model="auth">
            <md-table-row>
              <md-table-cell>URL</md-table-cell>
              <md-table-cell>{{ auth.auth_url }}</md-table-cell>
            </md-table-row>
            <md-table-row>
              <md-table-cell>Username</md-table-cell>
              <md-table-cell>{{ auth.username }}</md-table-cell>
            </md-table-row>
            <md-table-row>
              <md-table-cell>Password</md-table-cell>
              <md-table-cell>{{ auth.password }}</md-table-cell>
            </md-table-row>
            <md-table-row>
              <md-table-cell>Project</md-table-cell>
              <md-table-cell>{{ auth.project_name }}</md-table-cell>
            </md-table-row>
            <md-table-row>
              <md-table-cell>Domain</md-table-cell>
              <md-table-cell>{{ auth.domain_name }}</md-table-cell>
            </md-table-row>
            <md-table-row>
              <md-table-cell>Region</md-table-cell>
              <md-table-cell>{{ auth.region_name }}</md-table-cell>
            </md-table-row>
          </md-table>
        </md-tab>

        <md-tab id="tab-monitor" md-label="Monitor">
          <md-table v-model="monitor">
            <md-table-row>
              <md-table-cell>Backend</md-table-cell>
              <md-table-cell>{{ monitor.backend }}</md-table-cell>
            </md-table-row>
            <md-table-row>
              <md-table-cell>Address</md-table-cell>
              <md-table-cell>{{ monitor.address }}</md-table-cell>
            </md-table-row>
            <md-table-row>
              <md-table-cell>Username</md-table-cell>
              <md-table-cell>{{ monitor.username }}</md-table-cell>
            </md-table-row>
            <md-table-row>
              <md-table-cell>Password</md-table-cell>
              <md-table-cell>{{ monitor.password }}</md-table-cell>
            </md-table-row>
            <md-table-row>
              <md-table-cell>Metadata</md-table-cell>
              <md-table-cell>{{ monitor.metadata }}</md-table-cell>
            </md-table-row>
          </md-table>
        </md-tab>
        <md-tab id="tab-atengine" md-label="ATEngine">
          <md-table v-model="atengine">
            <md-table-row>
              <md-table-cell>Backend</md-table-cell>
              <md-table-cell>{{ atengine.backend }}</md-table-cell>
            </md-table-row>
            <md-table-row>
              <md-table-cell>Address</md-table-cell>
              <md-table-cell>{{ atengine.address }}</md-table-cell>
            </md-table-row>
            <md-table-row>
              <md-table-cell>APIKey</md-table-cell>
              <md-table-cell>{{ atengine.apikey }}</md-table-cell>
            </md-table-row>
            <md-table-row>
              <md-table-cell>Metadata</md-table-cell>
              <md-table-cell>{{ atengine.metadata }}</md-table-cell>
            </md-table-row>
          </md-table>
        </md-tab>
        <md-tab id="tab-tags" md-label="Tags" v-model="tags">
          <md-table v-model="tags">
            <md-table-row>
              <md-table-cell>Tags</md-table-cell>
              <md-table-cell>{{ tags.join(", ") }}</md-table-cell>
            </md-table-row>
          </md-table>
        </md-tab>
      </md-tabs>
      <md-dialog-actions>
        <md-button class="md-success" @click="showDialog = false">
          Close
        </md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
export default {
  name: "cloud-details",
  data: () => ({
    showDialog: false,
    tags: [],
    auth: {},
    monitor: {},
    atengine: {}
  }),
  mounted: function() {
    let self = this;
    this.$root.$on("open_cloud_details", function(data) {
      self.tags = data.tags;
      self.auth = data.auth;
      self.monitor = data.monitor;
      self.atengine = data.atengine;
      self.showDialog = true;
    });
  }
};
</script>

<style lang="scss">
.md-dialog,
.md-dialog-container {
  max-width: 768px;
}
.md-tabs-navigation {
  background-color: #4caf50 !important;
  margin: auto 0 !important;
}
</style>
