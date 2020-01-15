<template>
  <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50">
    <md-card>
      <md-card-header data-background-color="green">
        <h4 class="title">Authentication</h4>
      </md-card-header>
      <md-card-content>
        <md-field>
          <label>Authentication URL</label>
          <md-input v-model="auth.auth_url" required></md-input>
        </md-field>
        <md-field>
          <label>Username</label>
          <md-input v-model="auth.username" required></md-input>
        </md-field>
        <md-field>
          <label>Password</label>
          <md-input v-model="auth.password" type="password" required></md-input>
        </md-field>
        <md-field>
          <label>Project</label>
          <md-input v-model="auth.project_name" required></md-input>
        </md-field>
        <md-field>
          <label>Domain</label>
          <md-input v-model="auth.domain_name"></md-input>
        </md-field>
        <md-field>
          <label>Region</label>
          <md-input v-model="auth.region_name"></md-input>
        </md-field>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
export default {
  name: "auth-card",
  data: () => ({
    auth: {
      auth_url: null,
      username: null,
      password: null,
      project_name: null,
      domain_name: null,
      region_name: null
    }
  })
};
</script>
