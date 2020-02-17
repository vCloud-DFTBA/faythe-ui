<template>
  <v-data-table
    color="primary"
    :headers="headers"
    :items="healers"
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
    <template v-slot:expanded-item flat>
      <td :colspan="headers.length">
        <v-container>
          <v-row class="ml-10">
            <template v-for="(action, key) in healer.actions">
              <v-col lg="4" :key="`${action.type + key}`">
                <v-card color="primary" raised>
                  <v-card-title class="justify-center">
                    {{ capitalizeFLetter(action.type) }}
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-simple-table dense>
                    <template v-slot:default>
                      <tbody>
                        <tr v-for="(v, k) in action" :key="`${v + k}`">
                          <td>{{ capitalizeFLetter(k) }}</td>
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
        { text: "Receivers", value: "receivers" },
        { text: "Evaluation Level", value: "evaluation_level" },
        { text: "Active", value: "active" },
        { text: "Description", value: "description" },
        { text: "Tags", value: "tags" },
        { text: "Actions", value: "actions" }
      ],
      rawHealers: {},
      healers: []
    };
  },
  mounted() {
    let self = this;
    this.$root.$on("fetch_child_comp", function(data) {
      self.loading = true;
      let cloudid = data.split(" - ")[0];
      this.$api.getHealers(cloudid).then(response => {
        self.rawHealers = response.data.Data;
        let arr = [];
        for (let k in self.rawHealers) {
          let h = self.rawHealers[k];
          arr.push({
            id: h.id,
            query: h.query,
            interval: h.interval,
            duration: h.duration,
            receivers: h.receivers,
            evaluation_level: h.evaluation_level,
            description: h.description,
            tags: h.tags,
            active: h.active
          });
        }
        self.healers = arr;
      });
      self.loading = false;
    });
  },
  methods: {
    capitalizeFLetter(s) {
      return s[0].toUpperCase() + s.slice(1);
    }
  },
  computed: {
    healer: function() {
      for (let k in this.rawHealers) {
        var healer = this.rawHealers[k];
      }
      return healer;
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
