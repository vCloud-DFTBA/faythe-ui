import axios from "axios";

import helpers from "./helpers";

function getRequest(endpoint) {
  return axios
    .get(endpoint, {
      headers: {
        authorization: helpers.getCookie("Authorization")
      }
    })
    .catch(function(error) {
      if (error.response.status == 401) {
        if (helpers.getCookie("Authorization")) {
          helpers.deleteCookie("Authorization");
          window.location.href = "/";
        }
      } else {
        throw error;
      }
    });
}
function deleteRequest(endpoint) {
  return axios
    .delete(endpoint, {
      headers: {
        authorization: helpers.getCookie("Authorization")
      }
    })
    .catch(function(error) {
      if (error.response.status == 401) {
        if (helpers.getCookie("Authorization")) {
          helpers.deleteCookie("Authorization");
          window.location.href = "/";
        }
      } else {
        throw error;
      }
    });
}
function postRequest(endpoint, data) {
  return axios
    .post(endpoint, data, {
      headers: {
        authorization: helpers.getCookie("Authorization")
      }
    })
    .catch(function(error) {
      if (error.response.status == 401) {
        if (helpers.getCookie("Authorization")) {
          helpers.deleteCookie("Authorization");
          window.location.href = "/";
        }
      } else {
        throw error;
      }
    });
}

export default {
  login(user, pass) {
    return axios.post(
      "/public/tokens",
      {},
      {
        auth: {
          username: user,
          password: pass
        }
      }
    );
  },

  getClouds() {
    return getRequest("/clouds");
  },

  getHealers(id) {
    return getRequest("/healers/" + id);
  },

  getScalers(id) {
    return getRequest("/scalers/" + id);
  },

  getSilences(id) {
    return getRequest("/silences/" + id);
  },

  getUsers() {
    return getRequest("/users");
  },

  createCloud(provider, data) {
    return postRequest("/clouds/" + provider, data);
  },

  createHealer(id, data) {
    return postRequest("/healers/" + id, data);
  },

  createScaler(id, data) {
    return postRequest("/scalers/" + id, data);
  },

  createSilencer(id, data) {
    return postRequest("/silences/" + id, data);
  },

  createUser(data) {
    return postRequest("/users", data);
  },

  deleteCloud(ids) {
    return deleteRequest("/clouds/" + ids.join("/"));
  },

  deleteHealer(ids) {
    return deleteRequest("/healers/" + ids.join("/"));
  },

  deleteScaler(ids) {
    return deleteRequest("/scalers/" + ids.join("/"));
  },

  deleteSilencer(ids) {
    return deleteRequest("/silences/" + ids.join("/"));
  },

  deleteUser(ids) {
    return deleteRequest("/users/" + ids.join("/"));
  }
};
