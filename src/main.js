import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import store from './store'
import 'vuetify/dist/vuetify.min.css' // css-loader
import 'babel-polyfill'

Vue.use(Vuetify, {
  theme: {
    primary: '#FFC107',
    secondary: '#EEEEEE',
    accent: '#F57F17'
  }
})

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
