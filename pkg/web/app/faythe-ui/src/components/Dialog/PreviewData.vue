<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-content class="md-scrollbar">
        POST /clouds/create
        <pre>{{ json }}</pre>
      </md-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">
          Close
        </md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
export default {
  name: "preview-data",
  data: () => ({
    showDialog: false,
    json: null
  }),
  mounted: function() {
    let self = this;
    this.$root.$on("preview_data", function(data) {
      self.json = JSON.stringify(data, undefined, 2);
      self.showDialog = true;
    });
  }
};
</script>

<style lang="scss" scoped>
.md-dialog,
.md-dialog-container {
  max-width: 768px;
}
.md-tabs-navigation {
  margin: auto 0 !important;
}
</style>
