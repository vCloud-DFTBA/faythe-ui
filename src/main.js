import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.use({
  install (Vue) {
    Vue.prototype.$api = axios.create({
      baseURL: 'http://localhost:8600/',
      auth: {
        username: 'admin',
        password: '4ut0h34lyng@cloud'
      },
    })
  }
})

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
