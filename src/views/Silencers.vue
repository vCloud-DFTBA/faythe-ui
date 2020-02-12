<template>
  <v-container>
    <v-card class="mt-6">
      <v-toolbar flat color="primary">
        <v-toolbar-title>Silencers</v-toolbar-title>
      </v-toolbar>
      <v-divider class="my-6"></v-divider>
      <silencers-table></silencers-table>
    </v-card>
  </v-container>
</template>

<script>
import SilencersTable from "@/components/tables/SilencersTable";
export default {
  name: "silencers",
  components: {
    SilencersTable
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped></style>
