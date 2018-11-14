import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import firebase from 'firebase/app';
import 'firebase/auth';

Vue.config.productionTip = false;

// Initialize Firebase
const config = {
  apiKey:             process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain:         process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL:        process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId:          process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket:      process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:  process.env.VUE_APP_FIREBASE_MESSAGING_SENSER_ID,
};
firebase.initializeApp(config);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');