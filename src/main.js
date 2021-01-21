import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.filter('date', dateFilter)

firebase.initializeApp({
  apiKey: 'AIzaSyBdkxwgt8TlKIZ7TQu6BmIFIwRZoaebpro',
  authDomain: 'many-organaizer.firebaseapp.com',
  projectId: 'many-organaizer',
  storageBucket: 'many-organaizer.appspot.com',
  messagingSenderId: '639554075802',
  appId: '1:639554075802:web:0640b09e088c041ba3b323',
  measurementId: 'G-E63SV6JQ3Z'
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
