<template>
  <v-container>
    <v-card class="mt-6">
      <v-toolbar flat>
        <v-toolbar-title>Scalers</v-toolbar-title>
      </v-toolbar>
      <v-divider></v-divider>
      <select-cloud key="scaler"></select-cloud>
      <scalers-table></scalers-table>
    </v-card>
  </v-container>
</template>

<script>
import SelectCloud from "@/components/SelectCloud";
import ScalersTable from "@/components/tables/ScalersTable";
export default {
  name: "scalers",
  components: {
    SelectCloud,
    ScalersTable
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped></style>
