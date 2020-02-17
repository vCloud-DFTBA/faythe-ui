<template>
  <v-row justify="center">
    <v-dialog v-model="openDialog" scrollable max-width="800px">
      <v-card>
        <v-card-title>Preview</v-card-title>
        <v-divider></v-divider>
        <v-card-text
          ><pre>{{ dialog_data }}</pre></v-card-text
        >
        <v-divider></v-divider>
        <v-card-actions justify="right">
          <v-spacer></v-spacer>
          <v-btn x-large text @click="openDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ["dialog", "dialog_data"],
  computed: {
    openDialog: {
      get: function() {
        return this.dialog;
      },
      set: function(value) {
        this.$root.$emit("close_preview_data", value);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
