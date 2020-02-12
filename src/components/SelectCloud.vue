<template>
  <v-select
    :items="clouds"
    label="Cloud"
    class="ma-6"
    v-model="selected"
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
