import Vue from 'vue';
import Router from 'vue-router';
import Todo from '@/components/Todo.vue';
import About from '@/components/About.vue';
import firebase from 'firebase/app';
import 'firebase/auth';


import store from '@/store';

const Signin  = () => import('@/components/Signin.vue');

Vue.use(Router);

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
      name: 'Todo',
      component: Todo,
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
      if (user && store.getters['user/loggedin']) {
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
