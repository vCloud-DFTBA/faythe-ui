<template>
  <v-data-table
    :headers="headers"
    :items="clouds"
    :items-per-page="10"
    class="elevation-1"
    single-expand
    :expanded.sync="expanded"
    show-expand
    expand-icon="mdi-unfold-more-horizontal"
    disable-filtering
    disable-sort
    :loading="loading"
  >
    <template v-slot:item.actions="{ item }">
      <v-icon @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:expanded-item="{ item }" flat>
      <td colspan="12">
        <v-container>
          <v-row>
            <template v-for="n in ['auth', 'monitor', 'atengine']">
              <v-col cols="12" lg="4" :key="n">
                <v-card raised>
                  <v-card-title class="justify-center text-capitalize">
                    {{ n }}
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-simple-table :key="n" dense>
                    <template v-slot:default>
                      <tbody>
                        <tr
                          v-for="(v, k) in getCloud(item.id)[n]"
                          :key="`${v + k}`"
                        >
                          <td class="text-capitalize">{{ k }}</td>
                          <td>{{ v }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-card>
              </v-col>
            </template>
          </v-row>
        </v-container>
      </td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data() {
    return {
      expanded: [],
      loading: true,
      headers: [
        { text: "ID", value: "id" },
        { text: "Type", value: "type" },
        { text: "Auth", value: "auth" },
        { text: "Monitor", value: "monitor" },
        { text: "ATEngine", value: "atengine" },
        { text: "Actions", value: "actions" }
      ],
      rawClouds: {}
    };
  },
  mounted() {
    this.$api.getClouds().then(response => {
      this.rawClouds = response.data.Data;
      this.loading = false;
    });
  },
  methods: {
    getCloud(id) {
      return this.rawClouds["/clouds/" + id];
    }
  },
  computed: {
    clouds: function() {
      let arr = [];
      for (let key in this.rawClouds) {
        let cloud = this.rawClouds[key];
        arr.push({
          id: cloud.id,
          type: cloud.provider,
          auth: cloud.auth.auth_url,
          monitor: cloud.monitor.address,
          atengine: cloud.atengine.address
        });
      }
      return arr;
    }
  }
};
</script>

<style lang="scss" scoped>
.v-card .v-card--raised > .v-card__title {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
