<template>
  <v-container>
    <v-card class="mt-6">
      <v-row>
        <v-col cols="12">
          <v-toolbar flat color="primary">
            <v-toolbar-title>Create Silencer</v-toolbar-title>
          </v-toolbar>
          <v-container class="my-2">
            <v-row>
              <v-col cols="12" lg="6">
                <v-select
                  :items="clouds"
                  v-model="cloud"
                  label="Cloud *"
                  outlined
                  :rules="[rules.required]"
                ></v-select>
              </v-col>
              <v-col cols="12" lg="6">
                <v-text-field
                  label="Name *"
                  outlined
                  :rules="[rules.required]"
                  v-model="name"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" lg="6">
                <v-text-field
                  label="Pattern *"
                  outlined
                  :rules="[rules.required]"
                  v-model="pattern"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="6">
                <v-text-field
                  label="TTL *"
                  outlined
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
                  outlined
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
                  outlined
                  v-model="description"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      clouds: [],
      cloud: "",
      name: "",
      pattern: "",
      ttl: "",
      tags: [],
      description: "",
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
  },
  methods: {
    remove(item) {
      this.tags.splice(this.tags.indexOf(item), 1);
      this.tags = [...this.tags];
    }
  }
};
</script>

<style lang="scss" scoped></style>
