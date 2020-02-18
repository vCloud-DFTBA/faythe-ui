<template>
  <v-container>
    <v-card class="mt-6">
      <v-toolbar flat>
        <v-toolbar-title>Healers</v-toolbar-title>
      </v-toolbar>
      <v-divider></v-divider>
      <select-cloud></select-cloud>
      <healers-table></healers-table>
    </v-card>
  </v-container>
</template>

<script>
import HealersTable from "@/components/tables/HealersTable";
import SelectCloud from "@/components/SelectCloud";

export default {
  name: "healers",
  components: {
    HealersTable,
    SelectCloud
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped></style>
