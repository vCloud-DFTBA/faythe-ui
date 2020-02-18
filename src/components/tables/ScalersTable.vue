<template>
  <v-data-table
    :headers="headers"
    :items="scalers"
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
            <template v-for="(action, key) in getScaler(item.id).actions">
              <v-col lg="4" :key="`${action.url + key}`">
                <v-card raised>
                  <v-card-title class="justify-center text-capitalize">
                    {{ action.type }}
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-simple-table dense>
                    <template v-slot:default>
                      <tbody>
                        <tr v-for="(v, k) in action" :key="`${v + k}`">
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
      loading: false,
      headers: [
        { text: "ID", value: "id" },
        { text: "Query", value: "query" },
        { text: "Interval", value: "interval" },
        { text: "Duration", value: "duration" },
        { text: "Cooldown", value: "cooldown" },
        { text: "Active", value: "active" },
        { text: "Description", value: "description" },
        { text: "Tags", value: "tags" },
        { text: "Actions", value: "actions" }
      ],
      rawScalers: {},
      scalers: []
    };
  },
  mounted() {
    let self = this;
    this.$root.$on("fetch_child_comp", function(data) {
      self.loading = true;
      let cloudid = data.split(" - ")[0];
      this.$api.getScalers(cloudid).then(response => {
        self.rawScalers = response.data.Data;
        let arr = [];
        for (let k in self.rawScalers) {
          let s = self.rawScalers[k];
          let id = k.split("/")[3];
          self.rawScalers[id] = s;
          arr.push({
            id: s.id,
            query: s.query,
            interval: s.interval,
            duration: s.duration,
            description: s.description,
            cooldown: s.cooldown,
            tags: s.tags,
            active: s.active
          });
        }
        self.scalers = arr;
      });
      self.loading = false;
    });
  },
  methods: {
    getScaler(id) {
      return this.rawScalers[id];
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
