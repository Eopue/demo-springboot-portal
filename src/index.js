import Vue from 'vue'
import Login from './login.vue'

import './assets/stylus/index.styl'

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  render: (h) => h(Login)
}).$mount(root)