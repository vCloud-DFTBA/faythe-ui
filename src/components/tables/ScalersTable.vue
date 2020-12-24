<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="scalers"
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
        <v-icon @click="deleteScaler(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:expanded-item="{ item }" flat>
        <td colspan="12">
          <v-container>
            <v-row>
              <template v-for="(action, key) in getScaler(item.id).actions">
                <v-col lg="4" :key="`${action.url + key}`">
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
        <v-card-title class="headline"> Delete scaler? </v-card-title>

        <v-card-text>
          Deleting scaler might seriously affect your services. Do you still
          want to delete this scaler?
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
        { text: "Created by", value: "created_by" },
        { text: "Query", value: "query" },
        { text: "Interval", value: "interval" },
        { text: "Duration", value: "duration" },
        { text: "Cooldown", value: "cooldown" },
        { text: "Active", value: "active" },
        { text: "Description", value: "description" },
        { text: "Tags", value: "tags" },
        { text: "Actions", value: "actions" }
      ],
      rawScalers: {},
      scalers: []
    };
  },
  mounted() {
    let self = this;
    this.$root.$on("fetch_child_comp", function(data) {
      self.loading = true;
      let cloudid = data.split(" - ")[0];
      this.$api.getScalers(cloudid).then(response => {
        self.rawScalers = response.data.Data;
        let arr = [];
        for (let k in self.rawScalers) {
          let s = self.rawScalers[k];
          let id = k.split("/")[3];
          self.rawScalers[id] = s;
          arr.push({
            cloudid: cloudid,
            id: s.id,
            query: s.query,
            interval: s.interval,
            duration: s.duration,
            description: s.description,
            cooldown: s.cooldown,
            tags: s.tags,
            active: s.active,
            created_by: s.created_by
          });
        }
        self.scalers = arr;
      });
      self.loading = false;
    });
  },
  methods: {
    getScaler(id) {
      return this.rawScalers[id];
    },
    confirmDelete() {
      let self = this;
      this.$api
        .deleteScaler(this.selectedForDelete)
        .then(function(response) {
          if (response.data.Status == "OK") {
            self.snacktext = "Scaler deleted!";
            self.snackbar = true;
            self.openDialog = false;
            self.scalers = self.scalers.filter(function(value) {
              return value.id != self.selectedForDelete.split("/")[1];
            });
            delete self.rawScalers["/scalers/" + self.selectedForDelete];
            self.selectedForDelete = "";
          }
        })
        .catch(function(e) {
          if (e.response.data.Err) {
            self.snacktext = e.response.data.Err;
            self.snackbar = true;
          } else {
            self.snacktext = e;
            self.snackbar = true;
          }
        });
    },
    deleteScaler(scaler) {
      this.selectedForDelete = scaler.cloudid + "/" + scaler.id;
      this.openDialog = true;
    },
    onDismiss() {
      this.openDialog = false;
      this.selectedForDelete = "";
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
