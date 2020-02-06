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
      <v-icon
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:expanded-item="{ item }" flat>
      <td :colspan="headers.length">
        <v-container>
          <v-row class="ml-10" >
            <template v-for="n in ['auth', 'monitor', 'atengine']">
              <v-col lg="4" :key="n">
                <v-card color="primary" raised>
                  <v-card-title class="justify-center">
                    {{ capitalizeFLetter(n) }}
                  </v-card-title>
                  <v-simple-table :key="n" dense>
                    <template v-slot:default>
                      <tbody>
                        <tr v-for="(v, k) in getCloud(item.id)[n]" :key="`${v+k}`">
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
          { text: 'ID', value: 'id' },
          { text: 'Query', value: 'query' },
          { text: 'Receivers', value: 'receivers' },
          { text: 'Evaluation Level', value: 'evaluation_level' },
          { text: 'Active', value: 'active' },
          { text: 'Actions', value: 'action' },
        ],
        rawHealers: {},
        healers: [],
      }
    },
    mounted() {
      this.$root.$on('fetch_child_comp', function(data){
        let self = this
        self.loading = true
        let cloudid = data.split(' - ')[0]
        this.$api.getHealers(cloudid).then(response => {
          self.rawHealers = response.data.Data
          let arr = []
          for (let k in self.rawHealers) {
            let h = self.rawHealers[k]
            arr.push({
              id: h.id,
              query: h.query,
              // receivers: h.receivers,
              evaluation_level: h.evaluation_level,
              // active: h.active
            })
          }
          self.healers = arr
        });
        self.loading = false
      })
    }
  }
</script>

<style lang="scss" scoped>

</style>