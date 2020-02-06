<template>
  <v-container>
    <v-card class="mt-6">
      <v-toolbar flat color="primary">
        <v-toolbar-title>Clouds</v-toolbar-title>
      </v-toolbar>
      <v-divider class="my-6"></v-divider>
      <clouds-table></clouds-table>
    </v-card>
  </v-container>
</template>

<script>
  import CloudsTable from '@/components/tables/CloudsTable'

  export default {
    name: 'clouds',
    components: {
      CloudsTable
    },
    data() {
      return {
        
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>