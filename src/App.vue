<template>
  <div id="app">
    <div id="nav">
      <md-tabs v-show="loggedin" md-alignment="centered" md-sync-route>
        <md-tab md-label="Todo" to="/"></md-tab>
        <md-tab md-label="Chatroom" to="/chatroom"></md-tab>
        <md-tab md-label="About" to="/about"></md-tab>

        <md-tab md-label="Sign out" @click="signOut" class="md-raised md-primary"></md-tab>
      </md-tabs>
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import * as user from '@/store/modules/user';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';

Vue.use(VueMaterial);

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
