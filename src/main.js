import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import vuetify from './plugins/vuetify'
import Api from '@/plugins/Api.js'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:8600'

Vue.use({
  install (Vue) {
    Vue.prototype.$api = Api
  }
})

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
