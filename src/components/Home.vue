<template>
  <div class="hello">
    <h1>email: {{ email }}</h1>
    <h1>uid: {{ uid }}</h1>
    <h1>loggedin: {{ loggedin }}</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import * as user from '@/store/modules/user';

@Component<Home>({
    computed: {
        ...user.mapGetters(['email', 'uid', 'loggedin']),
    },
    methods: {
        ...user.mapActions(['logoutAction']),
    },
})
export default class Home extends Vue {
}

</script>

<style scoped>
 /* 省略 */
</style>
