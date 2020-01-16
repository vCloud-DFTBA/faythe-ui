<template>
  <div>
    <md-table
      v-model="healers"
      :table-header-color="tableHeaderColor"
      :md-active.sync="showHealersTable"
    >
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Query">{{ item.query }}</md-table-cell>
        <md-table-cell md-label="Receivers">{{ item.receivers }}</md-table-cell>
        <md-table-cell md-label="Query">{{ item.query }}</md-table-cell>
        <md-table-cell md-label="Evaluation level">{{
          item.evaluation_level
        }}</md-table-cell>
        <md-table-cell md-label="Active">{{ item.active }}</md-table-cell>
        <md-table-cell
          ><md-button class="md-accent" @click.native="deleteHealer(item)"
            >Delete</md-button
          ></md-table-cell
        >
      </md-table-row>
    </md-table>
    <md-dialog-confirm
      :md-active.sync="confirmation"
      md-title="Delete Healer?"
      md-content="Are you sure to delete healer? This action may harm your system."
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
  name: "healers-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      healers: [],
      showHealersTable: false,
      confirmation: false,
      selectedForDelete
    };
  },
  mounted() {
    let self = this;
    this.$root.$on("fetch_child_components", function(data) {
      let pid = data.split("-")[1].replace(" ", "");
      axios.get("/healers/" + pid).then(response => {
        let arr = [];
        let tmp = response.data.Data;
        for (let key in tmp) {
          arr.push(tmp[key]);
        }
        self.healers = arr;
        self.showHealersTable = true;
      });
    });
  },
  methods: {
    deleteHealer(healer) {
      this.selectedForDelete = healer;
      this.confirmation = true;
    },
    onConfirm() {
      let self = this;
      axios
        .delete(
          "/healers/" +
            self.selectedForDelete.cloudid +
            "/" +
            self.selectedForDelete.id
        )
        .then(response => {
          self.healers = self.healers.filter(function(value, index, arr) {
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
