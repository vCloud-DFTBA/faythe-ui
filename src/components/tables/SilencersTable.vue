<template>
  <v-data-table
    :headers="headers"
    :items="silences"
    :items-per-page="10"
    class="elevation-1"
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
  </v-data-table>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      headers: [
        { text: "ID", value: "id" },
        { text: "Pattern", value: "pattern" },
        { text: "TTL", value: "ttl" },
        { text: "Description", value: "description" },
        { text: "Actions", value: "actions" }
      ],
      silences: []
    };
  },
  mounted() {
    let self = this;
    this.$root.$on("fetch_child_comp", function(data) {
      self.loading = true;
      let cloudid = data.split(" - ")[0];
      this.$api.getSilences(cloudid).then(response => {
        let arr = [];
        for (let k in response.data.Data) {
          let s = response.data.Data[k];
          arr.push({
            id: s.id,
            pattern: s.pattern,
            ttl: s.ttl,
            description: s.description,
            tags: s.tags
          });
        }
        self.silences = arr;
      });
      self.loading = false;
    });
  }
};
</script>

<style lang="scss" scoped></style>
