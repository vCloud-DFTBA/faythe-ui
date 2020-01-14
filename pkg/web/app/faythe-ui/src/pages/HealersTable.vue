<template>
  <div class="content">
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
            <healers-table></healers-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { HealersTable, ProviderSelectionCard } from "@/components";

export default {
  components: {
    HealersTable,
    ProviderSelectionCard
  }
};
</script>
