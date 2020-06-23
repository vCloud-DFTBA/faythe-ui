<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="clouds"
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
        <v-icon @click="deleteCloud(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:expanded-item="{ item }" flat>
        <td colspan="12">
          <v-container>
            <v-row>
              <template v-for="n in ['auth', 'monitor']">
                <v-col cols="12" lg="4" :key="n">
                  <v-card raised>
                    <v-card-title class="justify-center text-capitalize">
                      {{ n }}
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-simple-table :key="n" dense>
                      <template v-slot:default>
                        <tbody>
                          <tr
                            v-for="(v, k) in getCloud(item.id)[n]"
                            :key="`${v + k}`"
                          >
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
        <v-card-title class="headline"> Delete cloud? </v-card-title>

        <v-card-text>
          Deleting cloud might seriously affect your services. Do you still want
          to delete this cloud?
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
      snackbar: false,
      snacktext: "",
      openDialog: false,
      loading: true,
      clouds: [],
      selectedForDelete: "",
      headers: [
        { text: "ID", value: "id" },
        { text: "Type", value: "type" },
        { text: "Auth", value: "auth" },
        { text: "Monitor", value: "monitor" },
        { text: "Actions", value: "actions" }
      ],
      rawClouds: {}
    };
  },
  mounted() {
    let self = this;
    this.$api.getClouds().then(response => {
      self.rawClouds = response.data.Data;
      for (let key in self.rawClouds) {
        let cloud = self.rawClouds[key];
        self.clouds.push({
          id: cloud.id,
          type: cloud.provider,
          auth: cloud.auth.auth_url,
          monitor: cloud.monitor.address
        });
      }
      self.loading = false;
    });
  },
  methods: {
    getCloud(id) {
      return this.rawClouds["/clouds/" + id];
    },
    confirmDelete() {
      let self = this;
      this.$api
        .deleteCloud(this.selectedForDelete)
        .then(function(response) {
          if (response.data.Err != "") {
            self.snacktext = response.data.Err;
            self.snackbar = true;
          } else {
            self.snacktext = "Cloud provider deleted!";
            self.snackbar = true;
            self.openDialog = false;
            self.clouds = self.clouds.filter(function(value) {
              return value.id != self.selectedForDelete;
            });
            delete self.rawClouds["/clouds/" + self.selectedForDelete];
            self.selectedForDelete = null;
          }
        })
        .catch(function(e) {
          self.snacktext = e;
          self.snackbar = true;
        });
    },
    deleteCloud(cloud) {
      this.selectedForDelete = cloud.id;
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
