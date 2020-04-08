import "@mdi/font/css/materialdesignicons.css";
import "typeface-roboto/index.css";

import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#ffffff",
        secondary: "#009688",
        accent: "#607d8b",
        error: "#f44336",
        warning: "#ff5722",
        info: "#03a9f4",
        success: "#4caf50"
      }
    }
  }
});
