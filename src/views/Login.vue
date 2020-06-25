<template>
  <v-app id="login">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar flat>
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-divider></v-divider>
              <v-card-text>
                <v-form
                  v-model="valid"
                  @keyup.native.enter="valid && Submit($event)"
                >
                  <v-text-field
                    label="Username"
                    v-model="username"
                    type="text"
                    prepend-icon="mdi-account"
                    color="black"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    v-model="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    color="black"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  class="mx-3 elevation-3"
                  @click="Submit"
                  :disabled="!valid"
                  text
                >
                  Login
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-snackbar v-model="snackbar" multi-line :timeout="5000" bottom>
          {{ snacktext }}
          <v-btn dark text @click="snackbar = false">
            Close
          </v-btn>
        </v-snackbar>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      snackbar: false,
      snacktext: "",
      valid: false
    };
  },
  methods: {
    Submit() {
      let self = this;
      this.$api
        .login(this.username, this.password)
        .then(function(response) {
          if (response.data.Status == "OK") {
            if (response.headers["authorization"]) {
              // document.cookie =
              //   "Authorization=" + response.headers["authorization"];
              localStorage.setItem(
                "authorization",
                response.headers["authorization"]
              );
            }
            window.location.href = "/clouds";
          }
        })
        .catch(function(error) {
          if (error.response.data.Err) {
            self.snacktext = error.response.data.Err;
            self.snackbar = true;
          } else {
            self.snackbar = "There was something wrong!";
            self.snackbar = true;
          }
        });
    }
  }
};
</script>
