import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import firebase from 'firebase/app'
import 'firebase/database'


import VModal from 'vue-js-modal'

firebase.initializeApp({
  apiKey: 'AIzaSyA4Tx2gmkpWkjrSIDicdnGsuea0ISpEL4A',
  authDomain: 'todo-5d397.firebaseapp.com',
  projectId: 'todo-5d397',
  storageBucket: 'todo-5d397.appspot.com',
  messagingSenderId: '625307904910',
  appId: '1:625307904910:web:749733ee401aded8bb52df'
})

Vue.use(VModal, { dialog: true })
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
