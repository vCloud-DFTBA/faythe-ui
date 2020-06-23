<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="users"
      :items-per-page="10"
      class="elevation-1"
      expand-icon="mdi-unfold-more-horizontal"
      disable-filtering
      disable-sort
      :loading="loading"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon @click="deleteUser(item)">
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
        <v-card-title class="headline"> Delete user? </v-card-title>

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
        { text: "Path", value: "path" },
        { text: "Policies", value: "policies" },
        { text: "Actions", value: "actions" }
      ],
      users: []
    };
  },
  mounted() {
    let self = this;
    self.loading = true;
    this.$api.getUsers().then(response => {
      let arr = [];
      for (let k in response.data.Data) {
        let u = response.data.Data[k];
        u.forEach((element, i) => {
          arr.push({
            id: k,
            path: element[0],
            policies: element[1],
            index: i
          });
        });
      }
      self.users = arr;
    });
    self.loading = false;
  },
  methods: {
    confirmDelete() {
      let self = this;
      this.$api
        .deleteUser(this.selectedForDelete)
        .then(function(response) {
          if (response.data.Status == "OK") {
            self.snacktext = "User deleted!";
            self.snackbar = true;
            self.openDialog = false;
            self.users = self.users.filter(function(value) {
              return value.id != self.selectedForDelete[0];
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
    deleteUser(user) {
      this.selectedForDelete.push(user.id);
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
