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
  },

  createCloud(id, data) {
    return axios.post("/clouds/" + id, data);
  },

  createHealer(id, data) {
    return axios.post("/healers/" + id, data);
  },

  createScaler(id, data) {
    return axios.post("/scalers/" + id, data);
  },

  createSilencer(id, data) {
    return axios.post("/silences/" + id, data);
  },

  deleteCloud(...ids) {
    return axios.delete("/clouds/" + ids.join("/"));
  },

  deleteHealer(...ids) {
    return axios.delete("/healers/" + ids.join("/"));
  },

  deleteScaler(...ids) {
    return axios.delete("/scalers/" + ids.join("/"));
  },

  deleteSilencer(...ids) {
    return axios.delete("/silences/" + ids.join("/"));
  }
};
