import Vue from 'vue';
import router from '@/router';
import store from '@/store';
import App from '@/App.vue';
import '@/registerServiceWorker';
import firebase from 'firebase/app';
import 'firebase/auth';

Vue.config.productionTip = false;

import config from '@/config';

firebase.initializeApp(config);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

