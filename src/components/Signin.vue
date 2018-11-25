<template>
  <div class="signin">
    <p>サインインしてください</p>
    <div id="firebaseui-auth-container"></div>
    <div id="loader">Loading...</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import * as user from '@/store/modules/user';

import firebase from 'firebase/app';
import firebaseui from 'firebaseui';
import 'firebase/auth';

const ui = new firebaseui.auth.AuthUI(firebase.auth());

@Component<Signin>({
    methods: {
        ...user.mapActions(['signInAction']),
    },
})
export default class Signin extends Vue {

  /**
   * サインインのためのUIを表示する。
   */
  private signin() {

    //  signInAction のためのコールバック関数
    const callback = (setUserFunc: (p: user.UserPayload) => void) => {
      const config: firebaseui.auth.Config = {
        signInFlow: 'popup',
        callbacks: {
          signInSuccessWithAuthResult: (authResult: any, redirectUrl: string) => {
            const payload: user.UserPayload = {
              uid: authResult.user.uid,
              email: authResult.user.email,
            };

            setUserFunc(payload);
            this.$router.push('/');
            return false;
          },
          uiShown: () => document.getElementById('loader').style.display = 'none',
        },
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        ],
      };

      ui.start('#firebaseui-auth-container', config);
    };

    this.signInAction({ callback });
  }

  private mounted() {
    this.signin();
  }

  private updated() {
    this.signin();
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
