<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="silences"
      :items-per-page="10"
      class="elevation-1"
      expand-icon="mdi-unfold-more-horizontal"
      disable-filtering
      disable-sort
      :loading="loading"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon @click="deleteSilencer(item)">
          mdi-delete
        </v-icon>
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
        <v-card-title class="headline"> Delete silencer? </v-card-title>

        <v-card-text>
          Please recheck!
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
      loading: false,
      snackbar: false,
      snacktext: "",
      openDialog: false,
      selectedForDelete: [],
      headers: [
        { text: "ID", value: "id" },
        { text: "Pattern", value: "pattern" },
        { text: "TTL", value: "ttl" },
        { text: "Description", value: "description" },
        { text: "Actions", value: "actions" }
      ],
      silences: []
    };
  },
  mounted() {
    let self = this;
    this.$root.$on("fetch_child_comp", function(data) {
      self.loading = true;
      let cloudid = data.split(" - ")[0];
      this.$api.getSilences(cloudid).then(response => {
        let arr = [];
        for (let k in response.data.Data) {
          let s = response.data.Data[k];
          arr.push({
            cloudid: cloudid,
            id: s.id,
            pattern: s.pattern,
            ttl: s.ttl,
            description: s.description,
            tags: s.tags
          });
        }
        self.silences = arr;
      });
      self.loading = false;
    });
  },
  methods: {
    confirmDelete() {
      let self = this;
      this.$api
        .deleteSilencer(this.selectedForDelete)
        .then(function(response) {
          if (response.data.Status == "OK") {
            self.snacktext = "Silencer deleted!";
            self.snackbar = true;
            self.openDialog = false;
            self.silences = self.silences.filter(function(value) {
              return value.id != self.selectedForDelete[1];
            });
            self.selectedForDelete = [];
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
    deleteSilencer(silencer) {
      this.selectedForDelete.push(silencer.cloudid);
      this.selectedForDelete.push(silencer.id);
      this.openDialog = true;
    },
    onDismiss() {
      this.openDialog = false;
      this.selectedForDelete = [];
    }
  }
};
</script>

<style lang="scss" scoped></style>
