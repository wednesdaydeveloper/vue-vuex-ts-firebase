import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld.vue';
import About from '@/components/About.vue';
import Signup from '@/components/Signup.vue';
import Signin from '@/components/Signin.vue';
import firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(Router);

const router = new Router({
  // mode: 'history',
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
      path: '/signup',
      name: 'Signup',
      component: Signup,
      meta: { isPublic: true },
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
