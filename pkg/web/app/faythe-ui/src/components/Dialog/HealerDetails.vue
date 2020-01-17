<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-tabs class="md-primary" md-card md-dynamic-height>
        <md-tab id="tab-basic-info" md-label="Basic Info">
          <md-table v-model="healer">
            <md-table-row>
              <md-table-cell>Cloud ID</md-table-cell>
              <md-table-cell>{{ healer.cloudid }}</md-table-cell>
            </md-table-row>
            <md-table-row>
              <md-table-cell>ID</md-table-cell>
              <md-table-cell>{{ healer.id }}</md-table-cell>
            </md-table-row>
            <md-table-row>
              <md-table-cell>Active</md-table-cell>
              <md-table-cell>{{ healer.active }}</md-table-cell>
            </md-table-row>
            <md-table-row>
              <md-table-cell>Query</md-table-cell>
              <md-table-cell>{{ healer.query }}</md-table-cell>
            </md-table-row>
            <md-table-row>
              <md-table-cell>Interval</md-table-cell>
              <md-table-cell>{{ healer.interval }}</md-table-cell>
            </md-table-row>
            <md-table-row>
              <md-table-cell>Duration</md-table-cell>
              <md-table-cell>{{ healer.duration }}</md-table-cell>
            </md-table-row>
            <md-table-row>
              <md-table-cell>Evaluation Level</md-table-cell>
              <md-table-cell>{{ healer.evaluation_level }}</md-table-cell>
            </md-table-row>
            <md-table-row>
              <md-table-cell>Receivers</md-table-cell>
              <md-table-cell>{{ healer.receivers }}</md-table-cell>
            </md-table-row>
            <md-table-row>
              <md-table-cell>Tags</md-table-cell>
              <md-table-cell>{{ healer.tags }}</md-table-cell>
            </md-table-row>
          </md-table>
        </md-tab>
        <md-tab
          v-for="(action, name) in healer.actions"
          :key="`${action.type}-${name}`"
          :id="`tab-${action.type}-${name}`"
          :md-label="action.type"
        >
          <md-table>
            <md-table-row>
              <md-table-cell>Action Type</md-table-cell>
              <md-table-cell>{{ action.type }}</md-table-cell>
            </md-table-row>
            <md-table-row>
              <md-table-cell>Attempts</md-table-cell>
              <md-table-cell>{{ action.attempts }}</md-table-cell>
            </md-table-row>
            <md-table-row>
              <md-table-cell>Delay</md-table-cell>
              <md-table-cell>{{ action.delay }}</md-table-cell>
            </md-table-row>
            <md-table-row>
              <md-table-cell>Delay Type</md-table-cell>
              <md-table-cell>{{ action.delay_type }}</md-table-cell>
            </md-table-row>
            <template v-if="action.type == 'http'">
              <md-table-row>
                <md-table-cell>URL</md-table-cell>
                <md-table-cell>{{ action.url }}</md-table-cell>
              </md-table-row>
              <md-table-row>
                <md-table-cell>Method</md-table-cell>
                <md-table-cell>{{ action.method }}</md-table-cell>
              </md-table-row>
            </template>
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
  name: "healer-details",
  data() {
    return {
      showDialog: false,
      healer: {}
    };
  },
  mounted() {
    let self = this;
    this.$root.$on("open_healer_details", function(data) {
      self.healer = data;
      self.showDialog = true;
    });
  }
};
</script>
