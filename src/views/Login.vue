<template>
  <v-app id="login">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                flat
              >
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Username"
                    v-model="username"
                    prepend-icon="mdi-account"
                    type="text"
                    required
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    v-model="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    required
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn @click="Submit" color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        username: '',
        password: '',
      }
    },
    methods: {
      Submit() {
        this.$api.login(this.username, this.password).then(function(response){
          if (response.data.Status == 'OK') {
            let d = new Date();                
            d.setTime(d.getTime() + (60*60*1000));
            let expires = "expires="+ d.toUTCString();
            document.cookie = "status=loggedIn" + ";" + expires + ";path=/";
            window.location.href = '/clouds'
          } else {
            alert(response.data.Err)
          }
        })
      }
    }
  }
</script>