import axios from "axios";

export default {
  login(user, pass) {
    return axios.get("/public/login", {
      auth: {
        username: user,
        password: pass
      }
    });
  },

  getClouds() {
    return axios.get("/clouds");
  },

  getHealers(id) {
    return axios.get("/healers/" + id);
  }
};
