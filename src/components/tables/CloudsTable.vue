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
  <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-lead-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
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
        clouds: [],
      }
    },
    mounted() {
      this.$api.get("/clouds").then(response => {
        let arr = [];
        let tmp = response.data.Data;
        for (let key in tmp) {
          arr.push(tmp[key]);
        }
        this.clouds = arr;
      });
    },
  }
</script>

<style lang="scss" scoped>

</style>