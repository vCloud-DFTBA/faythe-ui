<template>
  <div>
    <md-table
      v-model="silences"
      :table-header-color="tableHeaderColor"
      :md-active.sync="showSilencesTable"
    >
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Pattern">{{ item.pattern }}</md-table-cell>
        <md-table-cell md-label="TTL">{{ item.ttl }}</md-table-cell>
        <md-table-cell md-label="Tags">{{ item.tags }}</md-table-cell>
        <md-table-cell md-label="Description">{{
          item.description
        }}</md-table-cell>
        <md-table-cell
          ><md-button class="md-accent" @click.native="deleteSilence(item)"
            >Delete</md-button
          ></md-table-cell
        >
      </md-table-row>
    </md-table>
    <md-dialog-confirm
      :md-active.sync="confirmation"
      md-title="Delete Silence?"
      md-content="Are you sure to delete silence? This action may harm your system."
      md-confirm-text="Agree"
      md-cancel-text="Disagree"
      @md-cancel="onCancel"
      @md-confirm="onConfirm"
    />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "silences-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      silences: [],
      showSilencesTable: false,
      silenceKeys: [],
      confirmation: false,
      selectedForDelete: null
    };
  },
  mounted() {
    let self = this;
    this.$root.$on("fetch_child_components", function(data) {
      let pid = data.split("-")[1].replace(" ", "");
      axios.get("/silences/" + pid).then(response => {
        let arr = [];
        let tmp = response.data.Data;
        for (let key in tmp) {
          arr.push(tmp[key]);
          self.silenceKeys.push(key);
        }
        self.silences = arr;
        self.showSilencesTable = true;
      });
    });
  },
  methods: {
    deleteSilence(silence) {
      this.selectedForDelete = silence;
      this.confirmation = true;
    },
    onConfirm() {
      let self = this;
      let url = self.silenceKeys.filter(function(value, index, arr) {
        return value.includes(self.selectedForDelete.id);
      });
      axios.delete(url[0]).then(response => {
        self.silences = self.silences.filter(function(value, index, arr) {
          return value.id != self.selectedForDelete.id;
        });
        self.selectedForDelete = null;
      });
    },
    onCancel() {
      this.confirmation = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.md-accent {
  background-color: #ff5252 !important;
}
</style>
