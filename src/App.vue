<template>
  <div id="app">
    <div id="nav">
      <router-link v-show="loggedin" to="/">Todo</router-link> &nbsp; 
      <router-link v-show="loggedin" to="/about">About</router-link> &nbsp; 
      <router-link v-show="!loggedin" to="/signin">Sign In</router-link> &nbsp; 
    </div>
    <router-view/>
    <button v-show="loggedin" @click="signOut">Sign out</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import * as user from '@/store/modules/user';

@Component<App>({
    computed: {
        ...user.mapGetters(['loggedin']),
    },
    methods: {
        ...user.mapActions(['logoutAction']),
    },
})
export default class App extends Vue {
  private signOut() {
    this.logoutAction();
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
