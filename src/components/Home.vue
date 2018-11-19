<template>
  <div class="hello">
    <h1>email: {{ email }}</h1>
    
    <button @click="signOut">Sign out</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import firebase from 'firebase/app';
import * as user from '@/store/modules/user';


@Component<Home>({
    computed: {
        ...user.mapGetters(['email']),
    },
})
export default class Home extends Vue {
    private signOut() {
      firebase.auth().signOut().then(() => {
        this.$router.push('/signin');
      });
    }
}

</script>

<style scoped>
 /* 省略 */
</style>
