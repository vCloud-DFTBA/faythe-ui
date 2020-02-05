import axios from 'axios'

export default {
  login(user, pass) {
    return axios.get(
      '/login/',
      {
        auth: {
          username: user,
          password: pass
        }
      }
    )
  }
}