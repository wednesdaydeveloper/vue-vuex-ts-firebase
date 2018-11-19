<template>
  <div class="signin">
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
        ...user.mapActions(['setUserAction']),
    },
})
export default class Signin extends Vue {

  private uiConfig: any;

  private created() {
    this.uiConfig = {
      signInFlow: 'popup',
      callbacks: {
        signInSuccessWithAuthResult: (authResult: any, redirectUrl: string) => {
          const payload = {
            uid: authResult.user.uid,
            email: authResult.user.email,
          };
          this.setUserAction(payload);
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
  }

  private mounted() {
    ui.start('#firebaseui-auth-container', this.uiConfig);
  }

  private updated() {
    ui.start('#firebaseui-auth-container', this.uiConfig);
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
