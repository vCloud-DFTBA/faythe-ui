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
                <v-col cols="12" lg="12">
                  <v-combobox
                    v-model="receivers"
                    chips
                    clearable
                    label="Receivers *"
                    multiple
                    color="black"
                    small-chips=""
                    :rules="[rules.arrrequired]"
                    append-icon=""
                  >
                    <template
                      v-slot:selection="{ attrs, item, select, selected }"
                    >
                      <v-chip
                        v-bind="attrs"
                        :input-value="selected"
                        close
                        @click="select"
                        @click:close="remove('receivers', item)"
                      >
                        {{ item }}
                      </v-chip>
                    </template>
                  </v-combobox>
                </v-col>
                <v-col cols="12" lg="12">
                  <v-combobox
                    v-model="tags"
                    chips
                    clearable
                    label="Tags"
                    multiple
                    color="black"
                    small-chips
                    append-icon=""
                  >
                    <template
                      v-slot:selection="{ attrs, item, select, selected }"
                    >
                      <v-chip
                        v-bind="attrs"
                        :input-value="selected"
                        close
                        @click="select"
                        @click:close="remove('tags', item)"
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
                  <v-switch
                    v-model="active"
                    :label="`${active ? 'Active' : 'Inactive'}`"
                    color="black"
                  ></v-switch>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" lg="12">
                  <v-text-field
                    label="Description"
                    color="black"
                    v-model="description"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col cols="12" lg="6">
          <v-card>
            <v-toolbar flat>
              <v-toolbar-title>Actions</v-toolbar-title>
            </v-toolbar>
            <v-divider></v-divider>
            <v-container class="px-0 pt-0 my-3">
              <v-row>
                <v-spacer></v-spacer>
                <v-btn
                  class="mx-6 elevation-3"
                  text
                  @click.native="addAction()"
                >
                  Add action
                </v-btn>
              </v-row>
              <template v-for="(v, k) in actions">
                <v-row class="elevation-2 ma-3" :key="`${v.type}-${k}`">
                  <v-col cols="12" lg="11" md="11" sm="11" class="py-0">
                    <v-container fluid class="fill-height pa-0">
                      <v-row align="center" justify="center">
                        <v-col cols="12" lg="3" md="3" sm="3" class="py-0">
                          <v-radio-group
                            v-model="v.type"
                            column
                            :mandatory="true"
                          >
                            <v-radio label="HTTP" value="http" color="black">
                            </v-radio>
                            <v-radio
                              label="Mail"
                              value="mail"
                              color="black"
                            ></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" lg="3" md="3" sm="3">
                          <v-text-field
                            label="Attempts"
                            color="black"
                            type="number"
                            v-model="v.attempts"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" lg="3" md="3" sm="3">
                          <v-text-field
                            label="Delay"
                            color="black"
                            v-model="v.delay"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" lg="3" md="3" sm="3">
                          <v-text-field
                            label="Delay type"
                            color="black"
                            v-model="v.delay_type"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row
                        align="center"
                        justify="center"
                        v-if="v.type == 'http'"
                      >
                        <v-col cols="12" lg="6" md="6" sm="6" class="pt-0">
                          <v-select
                            item-color="grey darken-3"
                            :items="methods"
                            v-model="v.method"
                            label="Method *"
                            color="black"
                            :rules="[rules.required]"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" lg="6" md="6" sm="6" class="pt-0">
                          <v-text-field
                            label="URL *"
                            color="black"
                            :rules="[rules.required]"
                            v-model="v.url"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row align="center" justify="center" v-else>
                        <v-col cols="12" lg="12" md="12" sm="12" class="py-0">
                          <p class="mb-3">
                            Send notification about healing actions triggered to
                            receivers. <br />
                            One Mail action per healer is
                            <strong>recommended</strong>.
                          </p>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-col>
                  <v-col cols="12" lg="1" md="1" sm="1" class="py-0 px-1">
                    <v-container fluid class="fill-height">
                      <v-row align="center" justify="center">
                        <v-icon @click="remove('action', v)">
                          mdi-delete
                        </v-icon>
                      </v-row>
                    </v-container>
                  </v-col>
                </v-row>
              </template>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center" class="mt-5">
        <v-btn
          x-large
          class="mx-3 elevation-3"
          @click="openDialog = !openDialog"
          text
        >
          Preview
        </v-btn>
        <v-btn
          x-large
          class="mx-3 elevation-3"
          type="submit"
          :disabled="!valid"
          text
        >
          Submit
        </v-btn>
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
      openDialog: false,
      snackbar: false,
      snacktext: "",
      active: false,
      clouds: [],
      methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
      cloud: "",
      receivers: [],
      tags: [],
      duration: "3m",
      interval: "18s",
      evaluation_level: 2,
      query: 'up{job=~".*compute-cadvisor.*|.*compute-node.*"} < 1',
      description: "",
      actions: [
        {
          attempts: 10,
          delay: "100ms",
          delay_type: "fixed",
          type: "HTTP",
          url: "",
          method: "POST"
        }
      ],
      rules: {
        required: value => !!value || "Required.",
        arrrequired: value => {
          if (!value || value.length < 1) {
            return "Required";
          }
          return true;
        }
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
  },
  methods: {
    remove(obj, item) {
      if (obj == "tags") {
        this.tags.splice(this.tags.indexOf(item), 1);
        this.tags = [...this.tags];
      } else if (obj == "receivers") {
        this.receivers.splice(this.receivers.indexOf(item), 1);
        this.receivers = [...this.receivers];
      } else if (obj == "action") {
        this.actions.splice(this.actions.indexOf(item), 1);
        this.actions = [...this.actions];
      }
    },
    addAction() {
      this.actions.push({
        attempts: 10,
        delay: "100ms",
        delay_type: "fixed",
        type: "HTTP",
        url: "",
        method: "POST"
      });
    },
    formData() {
      let t = {};
      let self = this;
      for (let i = 0; i < self.actions.length; i++) {
        let a = self.actions[i];
        if (a.type == "http") {
          t[a.type + "-" + i] = {
            attempts: a.attempts,
            delay: a.delay,
            delay_type: a.delay_type,
            url: a.url,
            method: a.method,
            type: a.type
          };
        } else {
          t[a.type + "-" + i] = {
            attempts: a.attempts,
            delay: a.delay,
            delay_type: a.delay_type,
            type: a.type
          };
        }
      }
      return {
        query: this.query,
        receivers: this.receivers,
        tags: this.tags,
        active: this.active,
        interval: this.interval,
        duration: this.duration,
        evaluation_level: this.evaluation_level,
        description: this.description,
        actions: t
      };
    },
    submit() {
      let self = this;
      let cid = this.cloud.split(" - ", 2)[0];
      let data = this.formData();
      this.$api
        .createHealer(cid, data)
        .then(function(response) {
          if (response.data.Err != "") {
            self.snacktext = response.data.Err;
            self.snackbar = true;
          } else {
            self.snacktext = "Healer registered!";
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
