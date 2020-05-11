<template>
  <v-select
    :items="clouds"
    label="Choose Cloud here!"
    class="ma-6"
    v-model="selected"
    color="black"
    item-color="grey darken-3"
  ></v-select>
</template>

<script>
export default {
  data() {
    return {
      clouds: [],
      selected: ""
    };
  },
  mounted() {
    let self = this;
    this.$api.getClouds().then(response => {
      let data = response.data.Data;
      for (let k in data) {
        self.clouds.push(
          data[k].id + " - " + data[k].provider + " - " + data[k].auth.auth_url
        );
      }
    });
  },
  watch: {
    selected: function(n) {
      this.$root.$emit("fetch_child_comp", n);
    }
  }
};
</script>

<style lang="scss" scoped></style>
