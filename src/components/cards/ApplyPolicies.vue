<template>
  <v-container>
    <v-form @submit.prevent="submit" v-model="valid">
      <v-card class="mt-6">
        <v-row>
          <v-col cols="12" class="py-0">
            <v-toolbar flat>
              <v-toolbar-title>Apply Policies</v-toolbar-title>
            </v-toolbar>
            <v-divider></v-divider>
            <v-container>
              <v-row>
                <v-col cols="12" lg="12">
                  <v-select
                    item-color="grey darken-3"
                    :items="users"
                    v-model="user"
                    label="User *"
                    color="black"
                    :rules="[rules.required]"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" lg="12">
                  <v-text-field
                    label="Path *"
                    color="black"
                    :rules="[rules.required]"
                    v-model="path"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" lg="3">
                  <v-checkbox
                    v-model="methods"
                    label="GET"
                    value="GET"
                    color="black"
                  ></v-checkbox>
                </v-col>
                <v-col cols="12" lg="3">
                  <v-checkbox
                    v-model="methods"
                    label="POST"
                    value="POST"
                    color="black"
                  ></v-checkbox>
                </v-col>
                <v-col cols="12" lg="3">
                  <v-checkbox
                    v-model="methods"
                    label="PUT"
                    value="PUT"
                    color="black"
                  ></v-checkbox>
                </v-col>
                <v-col cols="12" lg="3">
                  <v-checkbox
                    v-model="methods"
                    label="DELETE"
                    value="DELETE"
                    color="black"
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-card>
      <v-row justify="center" class="mt-5">
        <v-btn
          x-large
          class="mx-3 elevation-3"
          @click="openDialog = !openDialog"
          text
        >
          Preview
        </v-btn>
        <v-btn
          x-large
          class="mx-3 elevation-3"
          type="submit"
          :disabled="!valid"
          text
        >
          Submit
        </v-btn>
      </v-row>
    </v-form>
    <preview-data
      v-bind:dialog="openDialog"
      v-bind:dialog_data="data"
    ></preview-data>
    <v-snackbar v-model="snackbar" multi-line :timeout="5000" bottom>
      {{ snacktext }}
      <v-btn dark text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import PreviewData from "@/components/PreviewData";
export default {
  components: {
    PreviewData
  },
  data() {
    return {
      valid: false,
      snacktext: "",
      snackbar: false,
      showPassword: false,
      users: [],
      user: "",
      path: "",
      methods: [],
      policies: "",
      rules: {
        required: value => !!value || "Required."
      },
      openDialog: false
    };
  },
  mounted() {
    let self = this;
    this.$api.getUsers().then(response => {
      let data = response.data.Data;
      for (let k in data) {
        if (!self.users.includes(k)) {
          self.users.push(k);
        }
      }
    });
    this.$root.$on("close_preview_data", function(data) {
      self.openDialog = data;
    });
  },
  methods: {
    formData() {
      var ms = "";
      let self = this;
      for (let i = 0; i < self.methods.length; i++) {
        if (i != self.methods.length - 1) {
          ms += "(" + self.methods[i] + ")|";
        } else {
          ms += "(" + self.methods[i] + ")";
        }
      }
      return [
        {
          path: this.path,
          method: ms
        }
      ];
    },
    submit() {
      let self = this;
      let data = this.formData();
      this.$api
        .applyPolicies(self.user, data)
        .then(function(response) {
          if (response.data.Status == "OK") {
            self.snacktext = "Policies applied!";
            self.snackbar = true;
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
  computed: {
    data: function() {
      return this.formData();
    }
  }
};
</script>

<style lang="scss" scoped>
.v-sheet--tile {
  border-radius: 4px;
}
</style>
