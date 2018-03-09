// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

import 'vue-awesome/icons'

import Icon from 'vue-awesome/components/Icon'
import App from './App'
import router from './router'
import store from './store'
import api from './api'

localStorage.setItem('debug', 'leancloud*') // 开启调试模式

Vue.mixin({
  beforeCreate() {
    if (!this.$api) {
      this.$api = api;
    }
  }
});

Vue.config.productionTip = false

const options = {
  color: '#99CCCC',
  failedColor: '#874b4b',
  thickness: '4px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}

Vue.use(VueProgressBar, options)

const user = api.SDK.User.current()

if (user) {
  store.commit('setUser', user);
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  // components: { App },
  // template: '<App/>'
  render: h => h(App)
})
