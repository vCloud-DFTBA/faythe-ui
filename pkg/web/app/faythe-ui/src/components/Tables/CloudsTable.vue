<template>
  <div>
    <md-table v-model="clouds" :table-header-color="tableHeaderColor">
      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
        @click.native="onSelect(item)"
      >
        <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Type">{{ item.provider }}</md-table-cell>
        <md-table-cell md-label="Auth">{{ item.auth.auth_url }}</md-table-cell>
        <md-table-cell md-label="Monitor">{{
          item.monitor.address
        }}</md-table-cell>
        <md-table-cell md-label="ATEngine">{{
          item.atengine.address
        }}</md-table-cell>
        <md-table-cell
          ><md-button
            class="md-accent"
            @click.native.stop="deleteCloud(item.id)"
            >Delete</md-button
          ></md-table-cell
        >
      </md-table-row>
    </md-table>
    <md-dialog-confirm
      :md-active.sync="confirmation"
      md-title="Delete Cloud"
      md-content="Are you sure to delete cloud? This action may harm your system."
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
  name: "clouds-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      clouds: [],
      confirmation: false,
      confirmDelete: -1
    };
  },
  mounted() {
    axios.get("/clouds").then(response => {
      let arr = [];
      let tmp = response.data.Data;
      for (let key in tmp) {
        arr.push(tmp[key]);
      }
      this.clouds = arr;
    });
  },
  methods: {
    onSelect(item) {
      this.$root.$emit("open_cloud_details", item);
    },
    setConfirmation() {
      let self = this;
      return new Promise(function(resolve, reject) {
        (function waitForConfirmation() {
          if (self.confirmDelete == 1) return resolve();
          setTimeout(waitForConfirmation, 600);
        })();
      });
    },
    deleteCloud(id) {
      this.confirmation = true;
      let self = this;
      this.setConfirmation().then(function() {
        if (self.confirmDelete == 1) {
          axios.delete("/clouds/" + id).then(response => location.reload());
        }
      });
      this.confirmDelete = -1;
    },
    onConfirm() {
      this.confirmDelete = 1;
    },
    onCancel() {
      this.confirmDelete = 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.md-accent {
  background-color: #ff5252 !important;
}
</style>
