<template>
  <v-container>
    <v-form @submit.prevent="submit" v-model="valid">
      <v-card class="mt-6">
        <v-row>
          <v-col cols="12" class="py-0">
            <v-toolbar flat>
              <v-toolbar-title>Create User</v-toolbar-title>
            </v-toolbar>
            <v-divider></v-divider>
            <v-container>
              <v-row>
                <v-col cols="12" lg="12">
                  <v-text-field
                    label="Username *"
                    color="black"
                    :rules="[rules.required]"
                    v-model="username"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" lg="12">
                  <v-text-field
                    v-model="password"
                    :append-icon="
                      showPassword.monitor ? 'mdi-eye' : 'mdi-eye-off'
                    "
                    :type="showPassword ? 'text' : 'password'"
                    label="Password *"
                    @click:append="showPassword = !showPassword"
                    :rules="[rules.required]"
                    color="black"
                  ></v-text-field>
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
      username: "",
      password: "",
      rules: {
        required: value => !!value || "Required."
      },
      openDialog: false
    };
  },
  mounted() {
    let self = this;
    this.$root.$on("close_preview_data", function(data) {
      self.openDialog = data;
    });
  },
  methods: {
    formData() {
      return {
        username: this.username,
        password: this.password
      };
    },
    submit() {
      let self = this;
      let data = new URLSearchParams();
      data.append("username", this.username);
      data.append("password", this.password);
      this.$api
        .createUser(data)
        .then(function(response) {
          if (response.data.Status == "OK") {
            self.snacktext = "User registered!";
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
