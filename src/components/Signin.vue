<template>
  <div class="signin">
    <div id="firebaseui-auth-container"></div>
    <div id="loader">Loading...</div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import firebaseui from 'firebaseui';
import 'firebase/auth';

export default {
  mounted() {
    const uiConfig = {
      signInFlow: 'popup',
      signInSuccessUrl: '/',
      callbacks: {
        uiShown: () => document.getElementById('loader').style.display = 'none',
      },
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      ],
    };
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
