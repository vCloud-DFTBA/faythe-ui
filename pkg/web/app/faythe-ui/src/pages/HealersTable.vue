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
                <h4 class="title">Healers</h4>
              </md-card-header>
              <md-card-content>
                <healers-table table-header-color="green"></healers-table>
              </md-card-content>
            </md-card>
            <healer-details></healer-details>
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
                <h4 class="title">Create Healer</h4>
              </md-card-header>
              <md-card-content>
                <create-healer-card></create-healer-card>
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
  HealersTable,
  ProviderSelectionCard,
  CreateHealerCard,
  HealerDetails
} from "@/components";

export default {
  components: {
    HealersTable,
    ProviderSelectionCard,
    CreateHealerCard,
    HealerDetails
  }
};
</script>
