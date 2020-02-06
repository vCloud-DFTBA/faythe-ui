<template>
  <v-container>
    <v-card class="mt-6">
      <v-toolbar flat color="primary">
        <v-toolbar-title>Scalers</v-toolbar-title>
      </v-toolbar>
      <v-divider class="my-6"></v-divider>
      <scalers-table></scalers-table>
    </v-card>
  </v-container>
</template>

<script>
  import ScalersTable from '@/components/tables/ScalersTable'
  export default {
    name: 'scalers',
    components: {
      ScalersTable
    },
    data() {
      return {
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>