<template>
  <div>
    <md-table
      v-model="scalers"
      :table-header-color="tableHeaderColor"
      :md-active.sync="showScalersTable"
    >
      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
        @click.native="onSelect(item)"
      >
        <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Query">{{ item.query }}</md-table-cell>
        <md-table-cell md-label="Duration">{{ item.duration }}</md-table-cell>
        <md-table-cell md-label="Interval">{{ item.interval }}</md-table-cell>
        <md-table-cell md-label="Active">{{ item.active }}</md-table-cell>

        <md-table-cell
          ><md-button class="md-accent" @click.native.stop="deleteScaler(item)"
            >Delete</md-button
          ></md-table-cell
        >
      </md-table-row>
    </md-table>
    <md-dialog-confirm
      :md-active.sync="confirmation"
      md-title="Delete Scaler?"
      md-content="Are you sure to delete scaler? This action may harm your system."
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
  name: "scalers-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      scalers: [],
      scalersKey: [],
      showScalersTable: false,
      confirmation: false,
      selectedForDelete: null
    };
  },
  mounted() {
    let self = this;
    this.$root.$on("fetch_child_components", function(data) {
      let pid = data.split("-")[1].replace(" ", "");
      axios.get("/scalers/" + pid).then(response => {
        let arr = [];
        let tmp = response.data.Data;
        for (let key in tmp) {
          arr.push(tmp[key]);
          self.scalersKey.push(key);
        }
        self.scalers = arr;
        self.showScalersTable = true;
      });
    });
  },
  methods: {
    deleteScaler(scaler) {
      this.selectedForDelete = scaler;
      this.confirmation = true;
    },
    onConfirm() {
      let self = this;
      let url = self.scalersKey.filter(function(value, index, arr) {
        return value.includes(self.selectedForDelete.id);
      });
      axios.delete(url[0]).then(response => {
        self.scalers = self.scalers.filter(function(value, index, arr) {
          return value.id != self.selectedForDelete.id;
        });
        self.selectedForDelete = null;
      });
    },
    onCancel() {
      this.confirmation = false;
    },
    onSelect(item) {
      this.$root.$emit("open_scaler_details", item);
    }
  }
};
</script>

<style lang="scss" scoped>
.md-accent {
  background-color: #ff5252 !important;
}
</style>
