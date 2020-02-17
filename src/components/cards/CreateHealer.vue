<template>
  <v-container class="mt-3">
    <v-form @submit.prevent="submit" v-model="valid">
      <v-row>
        <v-col cols="12" lg="6">
          <v-card>
            <v-toolbar flat>
              <v-toolbar-title>Basic Info</v-toolbar-title>
            </v-toolbar>
            <v-divider></v-divider>
            <v-container class="my-2">
              <v-row>
                <v-col cols="12" lg="12">
                  <v-select
                    item-color="grey darken-3"
                    :items="clouds"
                    v-model="cloud"
                    label="Cloud *"
                    color="black"
                    :rules="[rules.required]"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" lg="12">
                  <v-text-field
                    label="Query *"
                    color="black"
                    :rules="[rules.required]"
                    v-model="query"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" lg="6">
                  <v-combobox
                    v-model="receivers"
                    chips
                    clearable
                    label="Receivers"
                    multiple
                    color="black"
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
                  <v-combobox
                    v-model="tags"
                    chips
                    clearable
                    label="Tags"
                    multiple
                    color="black"
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
              </v-row>
              <v-row>
                <v-col cols="12" lg="3">
                  <v-text-field
                    label="Interval *"
                    color="black"
                    :rules="[rules.required]"
                    v-model="interval"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" lg="3">
                  <v-text-field
                    label="Duration *"
                    :rules="[rules.required]"
                    v-model="duration"
                    color="black"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" lg="3">
                  <v-text-field
                    label="Evaluation Level *"
                    color="black"
                    type="number"
                    :rules="[rules.required]"
                    v-model="evaluation_level"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" lg="3">
                  <v-text-field
                    label="Pattern *"
                    color="black"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      clouds: [],
      cloud: "",
      receivers: [],
      tags: [],
      duration: "3m",
      interval: "18s",
      evaluation_level: 2,
      query: 'up{job=~".*compute-cadvisor.*|.*compute-node.*"} < 1',
      rules: {
        required: value => !!value || "Required."
      }
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
  }
};
</script>

<style lang="scss" scoped>
.v-sheet--tile {
  border-radius: 4px;
}
</style>
