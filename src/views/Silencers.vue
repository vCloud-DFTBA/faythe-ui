<template>
  <v-container>
    <v-card class="mt-6">
      <v-toolbar flat color="primary">
        <v-toolbar-title>Silencers</v-toolbar-title>
      </v-toolbar>
      <v-divider></v-divider>
      <select-cloud></select-cloud>
      <silencers-table></silencers-table>
    </v-card>
  </v-container>
</template>

<script>
import SelectCloud from "@/components/SelectCloud";
import SilencersTable from "@/components/tables/SilencersTable";
export default {
  name: "silencers",
  components: {
    SelectCloud,
    SilencersTable
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped></style>
