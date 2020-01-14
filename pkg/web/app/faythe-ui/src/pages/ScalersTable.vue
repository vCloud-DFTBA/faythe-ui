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
                <h4 class="title">Scalers</h4>
              </md-card-header>
              <md-card-content>
                <scalers-table></scalers-table>
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
              <md-card-content>
                <provider-selection-without-btn-card></provider-selection-without-btn-card>
              </md-card-content>
            </md-card>
          </div>
          <div
            class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
          >
            <md-card>
              <md-card-header data-background-color="green">
                <h4 class="title">Create Scalers</h4>
              </md-card-header>
              <md-card-content>
                <create-scaler-card></create-scaler-card>
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
  ScalersTable,
  ProviderSelectionCard,
  ProviderSelectionWithoutBtnCard,
  CreateScalerCard
} from "@/components";

export default {
  components: {
    ScalersTable,
    ProviderSelectionCard,
    ProviderSelectionWithoutBtnCard,
    CreateScalerCard
  }
};
</script>
