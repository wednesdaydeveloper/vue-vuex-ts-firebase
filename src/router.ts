import Vue from 'vue';
import Router from 'vue-router';
// import Todo from '@/components/Todo.vue';
// import About from '@/components/About.vue';
// import Chatroom from '@/components/Chatroom.vue';
import firebase from 'firebase/app';
import 'firebase/auth';

const Todo  = () => import('@/components/Todo.vue');
const About  = () => import('@/components/About.vue');
const Chatroom  = () => import('@/components/Chatroom.vue');
const Signin  = () => import('@/components/Signin.vue');

import store from '@/store';

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
      path: '/chatroom',
      name: 'chatroom',
      component: Chatroom,
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
  if (isPublic) {
    next();
  } else {
    firebase.auth().onAuthStateChanged((user) => {

      if (user) {
        if (!store.getters['user/loggedin']) {
          store.commit('user/setUser', {uid: user.uid, email: user.email});
          //  TodoのStateを初期化
          store.dispatch('todo/initStateAction', {uid: user.uid}, { root: true });
        }
        next();
      } else {
        next({
          path: '/signin',
          query: { redirect: to.fullPath },
        });
      }
    });
  }
});

export default router;
