<template>
  <div class="hello">
    <h1>Hello {{ name }}!!</h1>
    <h1>{{ json }}</h1>
    
    <button @click="signOut">Sign out</button>
  </div>
</template>

<script>
import firebase from 'firebase/app';

export default {
  computed: {
    name: () => firebase.auth().currentUser.email,
    json: () => JSON.stringify(firebase.auth().currentUser),
  },
  methods: {
    signOut() {
      firebase.auth().signOut().then(() => {
        this.$router.push('/signin');
      });
    },
  },
};
</script>

<style scoped>
 /* 省略 */
</style>
