<template>
  <v-data-table
    color="primary"
    :headers="headers"
    :items="clouds"
    :items-per-page="5"
    class="elevation-1"
    disable-filtering
    disable-sort
  >
  <template v-slot:item.action="{  }">
      <v-icon
        small
        class="mr-2"
      >
        mdi-lead-pencil
      </v-icon>
      <v-icon
        small
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    data() {
      return {
        headers: [
          { text: 'ID', value: 'id' },
          { text: 'Type', value: 'type' },
          { text: 'Auth', value: 'auth' },
          { text: 'Monitor', value: 'monitor' },
          { text: 'ATEngine', value: 'atengine' },
          { text: 'Actions', value: 'action' }
        ],
        clouds: [
          {
            id: '123',
            type: 'hello',
            auth: 'xyz',
            monitor: 'kkk',
            atengine: 'asdasd'
          }
        ],
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>