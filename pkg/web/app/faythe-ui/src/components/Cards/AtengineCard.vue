<template>
  <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50">
    <md-card>
      <md-card-header data-background-color="green">
        <h4 class="title">Automation Engine</h4>
      </md-card-header>
      <md-card-content>
        <md-autocomplete
          v-model="atengine.backend"
          :md-options="ATEngineBackends"
          md-layout="box"
          md-dense
          required
        >
          <label>ATEngine Backend</label>
        </md-autocomplete>
        <md-field>
          <label>Address</label>
          <md-input v-model="atengine.address" required></md-input>
        </md-field>
        <md-field>
          <label>APIKey</label>
          <md-textarea v-model="atengine.apikey" required></md-textarea>
        </md-field>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
export default {
  name: "atengine-card",
  data: () => ({
    atengine: {
      address: null,
      apikey: null,
      backend: null
    },

    ATEngineBackends: ["stackstorm"]
  })
};
</script>
