<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-tabs class="md-primary" md-card md-dynamic-height> </md-tabs>
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
  name: "scaler-details",
  data() {
    return {
      showDialog: false
    };
  }
};
</script>
