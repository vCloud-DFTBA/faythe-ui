<template>
  <v-container>
    <v-card class="mt-6">
      <v-toolbar flat>
        <v-toolbar-title>Users</v-toolbar-title>
      </v-toolbar>
      <v-divider></v-divider>
      <users-table></users-table>
    </v-card>
  </v-container>
</template>

<script>
import UsersTable from "@/components/tables/UsersTable";

export default {
  name: "users",
  components: {
    UsersTable
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped></style>
