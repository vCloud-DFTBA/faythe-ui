<template>
  <v-container class="mt-3">
    <v-row>
      <v-col cols="12" lg="3">
        <v-card>
          <v-toolbar flat color="primary">
            <v-toolbar-title>Cloud Provider</v-toolbar-title>
          </v-toolbar>
          <v-container class="my-2">
            <v-select
              :items="providers"
              v-model="provider"
              label="Cloud Provider *"
              outlined
              :rules="[rules.required]"
            ></v-select>
            <v-combobox
              v-model="tags"
              chips
              clearable
              label="Tags"
              multiple
              outlined
              single-line
            >
              <template v-slot:selection="{ attrs, item, select, selected }">
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
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="12" lg="3">
        <v-card>
          <v-toolbar flat color="primary">
            <v-toolbar-title>Monitor</v-toolbar-title>
          </v-toolbar>
          <v-container class="my-2">
            <v-select
              :items="monitors"
              v-model="monitor.backend"
              label="Monitor Backend *"
              outlined
              :rules="[rules.required]"
            ></v-select>
            <v-text-field
              label="Address *"
              outlined
              :rules="[rules.required]"
              v-model="monitor.address"
            ></v-text-field>
            <v-text-field
              label="Username *"
              outlined
              :rules="[rules.required]"
              v-model="monitor.username"
            ></v-text-field>
            <v-text-field
              v-model="monitor.password"
              :append-icon="showPassword.monitor ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword.monitor ? 'text' : 'password'"
              label="Password *"
              @click:append="showPassword.monitor = !showPassword.monitor"
              :rules="[rules.required]"
              outlined
            ></v-text-field>
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="12" lg="3">
        <v-card>
          <v-toolbar flat color="primary">
            <v-toolbar-title>Authentication</v-toolbar-title>
          </v-toolbar>
          <v-container class="my-2">
            <v-text-field
              label="Authentication URL *"
              outlined
              :rules="[rules.required]"
              v-model="auth.auth_url"
            ></v-text-field>
            <v-text-field
              label="Username *"
              outlined
              :rules="[rules.required]"
              v-model="auth.username"
            ></v-text-field>
            <v-text-field
              v-model="auth.password"
              :append-icon="showPassword.auth ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword.auth ? 'text' : 'password'"
              label="Password *"
              @click:append="showPassword.auth = !showPassword.auth"
              :rules="[rules.required]"
              outlined
            ></v-text-field>
            <v-text-field
              label="Project *"
              outlined
              :rules="[rules.required]"
              v-model="auth.project"
            ></v-text-field>
            <v-text-field
              label="Domain"
              outlined
              v-model="auth.domain"
            ></v-text-field>
            <v-text-field
              label="Region"
              outlined
              v-model="auth.region"
            ></v-text-field>
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="12" lg="3">
        <v-card>
          <v-toolbar flat color="primary">
            <v-toolbar-title>Automation Engine</v-toolbar-title>
          </v-toolbar>
          <v-container class="my-2">
            <v-select
              :items="atengines"
              v-model="atengine.backend"
              label="Automation Backend *"
              outlined
              :rules="[rules.required]"
            ></v-select>
            <v-text-field
              label="Address *"
              outlined
              :rules="[rules.required]"
              v-model="atengine.address"
            ></v-text-field>
            <v-text-field
              v-model="atengine.apikey"
              :append-icon="showPassword.atengine ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword.atengine ? 'text' : 'password'"
              label="API Key *"
              @click:append="showPassword.atengine = !showPassword.atengine"
              :rules="[rules.required]"
              outlined
            ></v-text-field>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" class="mt-5">
      <v-btn
        x-large
        color="success"
        class="mx-3"
        @click="openDialog = !openDialog"
        >Preview</v-btn
      >
      <v-btn x-large color="primary" class="mx-3">Submit</v-btn>
    </v-row>
    <preview-data
      v-bind:dialog="openDialog"
      v-bind:dialog_data="data"
    ></preview-data>
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
      providers: ["openstack"],
      monitors: ["prometheus"],
      atengines: ["stackstorm"],
      monitor: {
        backend: "",
        address: "",
        username: "",
        password: ""
      },
      auth: {
        auth_url: "",
        username: "",
        password: "",
        project: "",
        domain: "",
        region: ""
      },
      atengine: {
        backend: "",
        address: "",
        apikey: ""
      },
      provider: "",
      showPassword: {
        monitor: false,
        auth: false,
        atengine: false
      },
      rules: {
        required: value => !!value || "Required."
      },
      tags: [],
      openDialog: false
    };
  },
  mounted() {
    let self = this;
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
        auth: this.auth,
        atengine: this.atengine,
        monitor: this.monitor,
        provider: this.provider,
        tags: this.tags
      };
    }
  },
  computed: {
    data: function() {
      return this.formData();
    }
  }
};
</script>

<style lang="scss" scoped></style>
