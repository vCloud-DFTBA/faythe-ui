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
        <v-row>
          <v-col cols="12" lg="2">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon @click="deleteUser(item)" v-bind="attrs" v-on="on">
                  mdi-account-remove
                </v-icon>
              </template>
              <span> Delete User </span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" lg="2">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon @click="revokePolicy(item)" v-bind="attrs" v-on="on">
                  mdi-delete
                </v-icon>
              </template>
              <span> Delete Policy </span>
            </v-tooltip>
          </v-col>
        </v-row>
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
        <v-card-title class="headline">
          Delete {{ type_delete }}?
        </v-card-title>

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
      type_delete: "",
      selectedForDelete: [],
      headers: [
        { text: "Name", value: "name" },
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
        if (u.length == 0) {
          arr.push({
            name: k,
            path: "",
            policies: ""
          });
        } else {
          u.forEach(element => {
            arr.push({
              name: k,
              path: element[0],
              policies: element[1]
            });
          });
        }
      }
      self.users = arr;
    });
    self.loading = false;
  },
  methods: {
    confirmDelete() {
      let self = this;
      if (this.type_delete == "Policy") {
        this.$api
          .deletePolicy(this.selectedForDelete[0].name, [
            {
              path: this.selectedForDelete[0].path,
              method: this.selectedForDelete[0].policies
            }
          ])
          .then(function(response) {
            if (response.data.Status == "OK") {
              self.snacktext = "Policy deleted!";
              self.snackbar = true;
              self.openDialog = false;
              self.users =
                self.selectedForDelete[0].path != "" &&
                self.selectedForDelete[0].policies != ""
                  ? self.users.filter(function(value) {
                      return value != self.selectedForDelete[0];
                    })
                  : self.users;
              if (!self.users.includes(self.selectedForDelete[0].name)) {
                self.users.push({
                  name: self.selectedForDelete[0].name,
                  path: "",
                  policies: ""
                });
              }
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
      } else {
        this.$api
          .deleteUser(this.selectedForDelete)
          .then(function(response) {
            if (response.data.Status == "OK") {
              self.snacktext = "User deleted!";
              self.snackbar = true;
              self.openDialog = false;
              self.users = self.users.filter(function(value) {
                return value.name != self.selectedForDelete[0];
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
      }
    },
    deleteUser(user) {
      this.selectedForDelete.push(user.name);
      this.type_delete = "User";
      this.openDialog = true;
    },
    revokePolicy(item) {
      this.selectedForDelete.push(item);
      this.type_delete = "Policy";
      this.openDialog = true;
    },
    onDismiss() {
      this.openDialog = false;
      this.type_delete = "";
      this.selectedForDelete = [];
    }
  }
};
</script>

<style lang="scss" scoped></style>
