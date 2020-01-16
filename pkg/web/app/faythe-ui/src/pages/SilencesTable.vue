<template>
  <div class="content">
    <md-tabs class="md-success" md-alignment="fixed">
      <md-tab id="tab-view" md-label="View">
        <div class="md-layout">
          <div
            class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
          >
            <md-card>
              <md-card-content>
                <provider-selection-card></provider-selection-card>
              </md-card-content>
            </md-card>
          </div>
          <div
            class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
          >
            <md-card>
              <md-card-header data-background-color="green">
                <h4 class="title">Silences</h4>
              </md-card-header>
              <md-card-content>
                <silences-table table-header-color="green"></silences-table>
              </md-card-content>
            </md-card>
          </div>
        </div>
      </md-tab>
      <md-tab id="tab-create" md-label="Create">
        <div class="md-layout">
          <div
            class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
          >
            <md-card>
              <md-card-header data-background-color="green">
                <h4 class="title">Create Silence</h4>
              </md-card-header>
              <md-card-content>
                <create-silence-card></create-silence-card>
              </md-card-content>
            </md-card>
          </div>
        </div>
      </md-tab>
    </md-tabs>
  </div>
</template>

<script>
import {
  ProviderSelectionCard,
  SilencesTable,
  CreateSilenceCard
} from "@/components";

export default {
  components: {
    ProviderSelectionCard,
    SilencesTable,
    CreateSilenceCard
  }
};
</script>
