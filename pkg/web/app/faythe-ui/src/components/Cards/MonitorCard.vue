<template>
  <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50">
    <md-card>
      <md-card-header data-background-color="green">
        <h4 class="title">Monitor</h4>
      </md-card-header>
      <md-card-content>
        <md-autocomplete
          v-model="monitor.backend"
          :md-options="monitorBackends"
          md-layout="box"
          md-dense
          required
        >
          <label>Monitor Backend</label>
        </md-autocomplete>
        <md-field>
          <label>Address</label>
          <md-input v-model="monitor.address" required></md-input>
        </md-field>
        <md-field>
          <label>Username</label>
          <md-input v-model="monitor.username" required></md-input>
        </md-field>
        <md-field md-toggle-password>
          <label>Password</label>
          <md-input v-model="monitor.password" required></md-input>
        </md-field>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
export default {
  name: "monitor-card",
  data: () => ({
    monitor: {
      backend: null,
      address: null,
      username: null,
      password: null
    },

    monitorBackends: ["prometheus"]
  })
};
</script>
