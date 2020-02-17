<template>
  <v-container>
    <v-form @submit.prevent="submit" v-model="valid">
      <v-card class="mt-6">
        <v-row>
          <v-col cols="12" class="py-0">
            <v-toolbar flat color="primary">
              <v-toolbar-title>Create Silencer</v-toolbar-title>
            </v-toolbar>
            <v-divider></v-divider>
            <v-container>
              <v-row>
                <v-col cols="12" lg="6">
                  <v-select
                    item-color="grey darken-3"
                    :items="clouds"
                    v-model="cloud"
                    label="Cloud *"
                    solo
                    :rules="[rules.required]"
                  ></v-select>
                </v-col>
                <v-col cols="12" lg="6">
                  <v-text-field
                    label="Name *"
                    solo
                    :rules="[rules.required]"
                    v-model="name"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" lg="6">
                  <v-text-field
                    label="Pattern *"
                    solo
                    :rules="[rules.required]"
                    v-model="pattern"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" lg="6">
                  <v-text-field
                    label="TTL *"
                    solo
                    :rules="[rules.required]"
                    v-model="ttl"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" lg="6">
                  <v-combobox
                    v-model="tags"
                    chips
                    clearable
                    label="Tags"
                    multiple
                    solo
                    single-line
                  >
                    <template
                      v-slot:selection="{ attrs, item, select, selected }"
                    >
                      <v-chip
                        v-bind="attrs"
                        :input-value="selected"
                        close
                        @click="select"
                        @click:close="remove(item)"
                      >
                        {{ item }}
                      </v-chip>
                    </template>
                  </v-combobox>
                </v-col>
                <v-col cols="12" lg="6">
                  <v-text-field
                    label="Description"
                    solo
                    v-model="description"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-card>
      <v-row justify="center" class="mt-5">
        <v-btn
          x-large
          class="mx-3 elevation-3"
          @click="openDialog = !openDialog"
          text
          >Preview</v-btn
        >
        <v-btn
          x-large
          class="mx-3 elevation-3"
          type="submit"
          :disabled="!valid"
          text
          >Submit</v-btn
        >
      </v-row>
    </v-form>
    <preview-data
      v-bind:dialog="openDialog"
      v-bind:dialog_data="data"
    ></preview-data>
    <v-snackbar v-model="snackbar" multi-line :timeout="5000" bottom>
      {{ snacktext }}
      <v-btn dark text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import PreviewData from "@/components/PreviewData";
export default {
  components: {
    PreviewData
  },
  data() {
    return {
      valid: false,
      snacktext: "",
      snackbar: false,
      clouds: [],
      cloud: "",
      name: "",
      pattern: "",
      ttl: "",
      tags: [],
      description: "",
      rules: {
        required: value => !!value || "Required."
      },
      openDialog: false
    };
  },
  mounted() {
    let self = this;
    this.$api.getClouds().then(response => {
      let arr = [];
      for (let key in response.data.Data) {
        let data = response.data.Data[key];
        arr.push(data.id + " - " + data.provider + " - " + data.auth.auth_url);
      }
      self.clouds = arr;
    });
    this.$root.$on("close_preview_data", function(data) {
      self.openDialog = data;
    });
  },
  methods: {
    remove(item) {
      this.tags.splice(this.tags.indexOf(item), 1);
      this.tags = [...this.tags];
    },
    formData() {
      return {
        name: this.name,
        pattern: this.pattern,
        ttl: this.ttl,
        description: this.description,
        tags: this.tags
      };
    },
    submit() {
      let self = this;
      let cid = this.cloud.split(" - ", 2)[0];
      let data = this.formData();
      this.$api
        .createSilencer(cid, data)
        .then(function(response) {
          if (response.data.Err != "") {
            self.snacktext = response.data.Err;
            self.snackbar = true;
          } else {
            self.snacktext = "Silence registered!";
            self.snackbar = true;
          }
        })
        .catch(function(e) {
          self.snacktext = e;
          self.snackbar = true;
        });
    }
  },
  computed: {
    data: function() {
      return this.formData();
    }
  }
};
</script>

<style lang="scss" scoped>
.v-sheet--tile {
  border-radius: 4px;
}
</style>
