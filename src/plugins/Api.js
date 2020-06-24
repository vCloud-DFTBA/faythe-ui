import axios from "axios";

function executeRequest(endpoint, method, data) {
  return axios
    .request({
      method: method,
      url: endpoint,
      headers: {
        authorization: localStorage.getItem("authorization")
      },
      data: data
    })
    .catch(function(error) {
      if (error.response.status == 401) {
        if (localStorage.getItem("authorization")) {
          localStorage.removeItem("authorization");
          window.location.href = "/";
        }
      } else {
        throw error;
      }
    });
}

function getRequest(endpoint) {
  return executeRequest(endpoint, "GET", {});
}

function deleteRequest(endpoint, data) {
  return executeRequest(endpoint, "DELETE", data);
}

function postRequest(endpoint, data) {
  return executeRequest(endpoint, "POST", data);
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

  applyPolicies(user, data) {
    return postRequest("/policies/" + user, data);
  },

  deleteCloud(ids) {
    return deleteRequest("/clouds/" + ids.join("/"), {});
  },

  deleteHealer(ids) {
    return deleteRequest("/healers/" + ids.join("/"), {});
  },

  deleteScaler(ids) {
    return deleteRequest("/scalers/" + ids.join("/"), {});
  },

  deleteSilencer(ids) {
    return deleteRequest("/silences/" + ids.join("/"), {});
  },

  deleteUser(ids) {
    return deleteRequest("/users/" + ids.join("/"), {});
  },

  deletePolicy(user, data) {
    return deleteRequest("/policies/" + user, data);
  }
};
