<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="healers"
      :items-per-page="10"
      class="elevation-1"
      single-expand
      :expanded.sync="expanded"
      show-expand
      expand-icon="mdi-unfold-more-horizontal"
      disable-filtering
      disable-sort
      :loading="loading"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon @click="deleteHealer(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:expanded-item flat>
        <td colspan="12">
          <v-container>
            <v-row>
              <template v-for="(action, key) in healer.actions">
                <v-col lg="4" :key="`${action.type + key}`">
                  <v-card raised>
                    <v-card-title class="justify-center text-capitalize">
                      {{ action.type }}
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-simple-table dense>
                      <template v-slot:default>
                        <tbody>
                          <tr v-for="(v, k) in action" :key="`${v + k}`">
                            <td class="text-capitalize">{{ k }}</td>
                            <td>{{ v }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card>
                </v-col>
              </template>
            </v-row>
          </v-container>
        </td>
      </template>
    </v-data-table>
    <v-snackbar v-model="snackbar" multi-line :timeout="5000" bottom>
      {{ snacktext }}
      <v-btn dark text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
    <v-dialog v-model="openDialog" max-width="300">
      <v-card>
        <v-card-title class="headline"> Delete healer? </v-card-title>

        <v-card-text>
          Deleting healer might seriously affect your services. Do you still
          want to delete this healer?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="onDismiss()">
            Disagree
          </v-btn>

          <v-btn text @click.native="confirmDelete()">
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      expanded: [],
      loading: false,
      snackbar: false,
      snacktext: "",
      openDialog: false,
      selectedForDelete: "",
      headers: [
        { text: "ID", value: "id" },
        { text: "Query", value: "query" },
        { text: "Interval", value: "interval" },
        { text: "Duration", value: "duration" },
        { text: "Receivers", value: "receivers" },
        { text: "Evaluation Level", value: "evaluation_level" },
        { text: "Active", value: "active" },
        { text: "Description", value: "description" },
        { text: "Tags", value: "tags" },
        { text: "Actions", value: "actions" }
      ],
      rawHealers: {},
      healers: []
    };
  },
  mounted() {
    let self = this;
    this.$root.$on("fetch_child_comp", function(data) {
      self.loading = true;
      let cloudid = data.split(" - ")[0];
      this.$api.getHealers(cloudid).then(response => {
        self.rawHealers = response.data.Data;
        let arr = [];
        for (let k in self.rawHealers) {
          let h = self.rawHealers[k];
          arr.push({
            cloudid: h.cloudid,
            id: h.id,
            query: h.query,
            interval: h.interval,
            duration: h.duration,
            receivers: h.receivers,
            evaluation_level: h.evaluation_level,
            description: h.description,
            tags: h.tags,
            active: h.active
          });
        }
        self.healers = arr;
      });
      self.loading = false;
    });
  },
  methods: {
    confirmDelete() {
      let self = this;
      this.$api
        .deleteHealer(this.selectedForDelete)
        .then(function(response) {
          if (response.data.Status == "OK") {
            self.snacktext = "Healer deleted!";
            self.snackbar = true;
            self.openDialog = false;
            self.healers = [];
            self.rawClouds = {};
            self.selectedForDelete = "";
          }
        })
        .catch(function(e) {
          if (e.response.data.Err) {
            self.snacktext = e.response.data.Err;
            self.snackbar = true;
          }
          self.snacktext = e;
          self.snackbar = true;
        });
    },
    deleteHealer(healer) {
      this.selectedForDelete = healer.cloudid + "/" + healer.id;
      this.openDialog = true;
    },
    onDismiss() {
      this.openDialog = false;
      this.selectedForDelete = "";
    }
  },
  computed: {
    healer: function() {
      for (let k in this.rawHealers) {
        var healer = this.rawHealers[k];
      }
      return healer;
    }
  }
};
</script>

<style lang="scss" scoped>
.v-card .v-card--raised > .v-card__title {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
