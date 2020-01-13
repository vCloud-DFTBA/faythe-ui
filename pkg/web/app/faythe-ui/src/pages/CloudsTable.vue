<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Cloud Providers</h4>
          </md-card-header>
          <md-card-content>
            <clouds-table table-header-color="green"></clouds-table>
          </md-card-content>
        </md-card>
        <cloud-details></cloud-details>
      </div>
    </div>
  </div>
</template>

<script>
import { CloudsTable, CloudDetails } from "@/components";

export default {
  components: {
    CloudsTable,
    CloudDetails
  }
};
</script>
