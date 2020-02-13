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
  },

  getScalers(id) {
    return axios.get("/scalers/" + id);
  },

  getSilences(id) {
    return axios.get("/silences/" + id);
  }
};
