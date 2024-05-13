import App from './App'
import store from './store/index.js'
import thePublic from './store/public.js'
import API from 'API/apiList.js';
Vue.prototype.$store = store
Vue.prototype.$public = thePublic
Vue.prototype.API = API;

import uView from '@/uni_modules/uview-ui'
Vue.use(uView)


// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'


Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif