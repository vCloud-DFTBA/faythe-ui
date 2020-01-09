<template>
  <div>
    <md-dialog :md-active.sync="showDialog" style="overflow: visible !important;">
<!--      <md-dialog-title>{{ title }}</md-dialog-title>-->
      <md-tabs class="md-primary" md-dynamic-height>
        <md-tab id="tab-auth" md-label="Auth">
        </md-tab>

        <md-tab id="tab-monitor" md-label="Monitor"></md-tab>
        <md-tab id="tab-atengine" md-label="ATEngine"></md-tab>
        <md-tab id="tab-tags" md-label="Tags" v-model="tags">
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
    title: "",
    tags: [],
    auth: {},
    monitor: {},
    atengine: {}
  }),
  mounted: function () {
    let self = this;
    this.$root.$on("open_cloud_details", function(data) {
      self.title = data.id;
      self.tags = data.tags;
      self.auth = data.auth;
      self.monitor = data.monitor;
      self.atengine = data.atengine;
      self.showDialog = true;
    // eslint-disable-next-line no-console
      console.log(self.auth);
    });
  }
};
</script>
