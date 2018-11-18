import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld.vue';
import About from '@/components/About.vue';
import firebase from 'firebase/app';
import config from '@/config';

firebase.initializeApp(config);

Vue.use(Router);

const Signin = () => import('@/components/Signin.vue');

const router = new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: 'signin',
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin,
      meta: { isPublic: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some((record) => record.meta.isPublic);
  if (!isPublic) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        next();
      } else {
        next({
          path: '/signin',
          query: { redirect: to.fullPath },
        });
      }
    });
  } else {
    next();
  }
});

export default router;
