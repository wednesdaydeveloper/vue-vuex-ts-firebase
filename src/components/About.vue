<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2>email: {{ email }}</h2>
    <h2>uid: {{ uid }}</h2>
    <h2>loggedin: {{ loggedin }}</h2>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import * as user from '@/store/modules/user';

@Component<About>({
    computed: {
        ...user.mapGetters(['email', 'uid', 'loggedin']),
    },
})
export default class About extends Vue {
}

</script>
